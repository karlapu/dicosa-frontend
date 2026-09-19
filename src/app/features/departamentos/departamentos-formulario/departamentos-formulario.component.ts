import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../../../core/models/departamento';
import { DepartamentoService } from '../../../core/services/departamento.servicel';


@Component({
  selector: 'app-departamentos-formulario',
  standalone: false,
  templateUrl: './departamentos-formulario.component.html',
  styleUrl: './departamentos-formulario.component.css'
})
export class DepartamentosFormularioComponent implements OnInit {

  departamento: Departamento = { nombre: '' };
  modoEdicion = false;
  idDepartamento: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idDepartamento = Number(idParam);
      this.cargarDepartamento(this.idDepartamento);
    }
  }

  cargarDepartamento(id: number): void {
    this.departamentoService.buscarPorId(id).subscribe({
      next: (data) => this.departamento = data,
      error: () => this.error = 'No se pudo cargar la información del departamento.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idDepartamento
      ? this.departamentoService.actualizar(this.idDepartamento, this.departamento)
      : this.departamentoService.crear(this.departamento);

    peticion.subscribe({
      next: () => this.router.navigate(['/departamentos']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el departamento.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/departamentos']);
  }
}



