import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../../core/models/proveedor.model';
import { Municipio } from '../../../core/models/municipio.model';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { MunicipioService } from '../../../core/services/municipio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-formulario',
  standalone: false,
  templateUrl: './proveedores-formulario.component.html',
  styleUrl: './proveedores-formulario.component.css'
})
export class ProveedoresFormularioComponent implements OnInit {

  proveedor: Proveedor = {
    idMunicipio: 0,
    nombreEmpresa: '',
    nit: '',
    contacto: '',
    telefono: '',
    correo: '',
    direccion: ''
  };

  municipios: Municipio[] = [];

  modoEdicion = false;
  idProveedor: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private proveedorService: ProveedorService,
    private municipioService: MunicipioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMunicipios();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idProveedor = Number(idParam);
      this.cargarProveedor(this.idProveedor);
    }
  }

  cargarMunicipios(): void {
    this.municipioService.listarTodos().subscribe({
      next: (data) => this.municipios = data,
      error: () => this.error = 'No se pudieron cargar los municipios.'
    });
  }

  cargarProveedor(id: number): void {
    this.proveedorService.buscarPorId(id).subscribe({
      next: (data) => this.proveedor = data,
      error: () => this.error = 'No se pudo cargar la información del proveedor.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idProveedor
      ? this.proveedorService.actualizar(this.idProveedor, this.proveedor)
      : this.proveedorService.crear(this.proveedor);

    peticion.subscribe({
      next: () => this.router.navigate(['/proveedores']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el proveedor.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/proveedores']);
  }
}

