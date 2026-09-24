import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/models/cliente.model';
import { Municipio } from '../../../core/models/municipio.model';
import { ClienteService } from '../../../core/services/cliente.service';
import { MunicipioService } from '../../../core/services/municipio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-formulario',
  standalone: false,
  templateUrl: './clientes-formulario.component.html',
  styleUrl: './clientes-formulario.component.css'
})

export class ClientesFormularioComponent implements OnInit {

  cliente: Cliente = {
    idMunicipio: 0,
    nombre: '',
    nit: '',
    telefono: '',
    correo: '',
    direccion: ''
  };

  municipios: Municipio[] = [];

  modoEdicion = false;
  idCliente: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private clienteService: ClienteService,
    private municipioService: MunicipioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMunicipios();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idCliente = Number(idParam);
      this.cargarCliente(this.idCliente);
    }
  }

  cargarMunicipios(): void {
    this.municipioService.listarTodos().subscribe({
      next: (data) => this.municipios = data,
      error: () => this.error = 'No se pudieron cargar los municipios.'
    });
  }

  cargarCliente(id: number): void {
    this.clienteService.buscarPorId(id).subscribe({
      next: (data) => this.cliente = data,
      error: () => this.error = 'No se pudo cargar la información del cliente.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idCliente
      ? this.clienteService.actualizar(this.idCliente, this.cliente)
      : this.clienteService.crear(this.cliente);

    peticion.subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el cliente.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
