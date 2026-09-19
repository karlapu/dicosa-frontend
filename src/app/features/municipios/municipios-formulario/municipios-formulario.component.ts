import { Component, OnInit } from '@angular/core';
import { Municipio } from '../../../core/models/municipio.model';
import { Departamento } from '../../../core/models/departamento';
import { MunicipioService } from '../../../core/services/municipio.service';
import { DepartamentoService } from '../../../core/services/departamento.servicel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-municipios-formulario',
  standalone: false,
  templateUrl: './municipios-formulario.component.html',
  styleUrl: './municipios-formulario.component.css'
})

export class MunicipiosFormularioComponent implements OnInit {

  municipio: Municipio = {
    idDepartamento: 0,
    nombre: ''
  };

  departamentos: Departamento[] = [];

  modoEdicion = false;
  idMunicipio: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private municipioService: MunicipioService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDepartamentos();

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.modoEdicion = true;
      this.idMunicipio = Number(idParam);
      this.cargarMunicipio(this.idMunicipio);
    }
  }

  cargarDepartamentos(): void {
    this.departamentoService.listarTodos().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los departamentos.';
      }
    });
  }

  cargarMunicipio(id: number): void {
    this.municipioService.buscarPorId(id).subscribe({
      next: (data) => {
        this.municipio = data;
      },
      error: () => {
        this.error = 'No se pudo cargar el municipio.';
      }
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idMunicipio
      ? this.municipioService.actualizar(
          this.idMunicipio,
          this.municipio
        )
      : this.municipioService.crear(this.municipio);

    peticion.subscribe({
      next: () => this.router.navigate(['/municipios']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el municipio.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/municipios']);
  }
}
