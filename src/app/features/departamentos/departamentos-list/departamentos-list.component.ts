import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../../core/services/departamento.servicel';
import { Departamento } from '../../../core/models/departamento';

@Component({
  selector: 'app-departamentos-list',
  standalone: false,
  templateUrl: './departamentos-list.component.html',
  styleUrl: './departamentos-list.component.css'
})
export class DepartamentosListComponent implements OnInit {

departamentos: Departamento[] = [];
cargando = true;
error = '';

constructor(
  private departamentoService: DepartamentoService,
  private router: Router


) {}

ngOnInit(): void {
    this.cargarDepartamentos();

}


cargarDepartamentos(): void {
  this.cargando = true;
  this.departamentoService.listarTodos().subscribe({
  next: (data) => {
  this.departamentos = data;
  this.cargando = false;

  },
 error: () => {
  this.error = 'No se pudo contectar con el servidor.';
  this.cargando = false;
 }

  })
}

irANuevo(): void {
  this.router.navigate(['/departamentos/nuevo']);
}

irAEditar(id: number): void {
    this.router.navigate(['/departamentos/editar', id]);
}

desactivar(id: number): void {
  this.departamentoService.desactivar(id).subscribe({
  next: () => this.cargarDepartamentos(),
  error: () => this.error = 'No se puede desactivar el departamento.'

  });
}

  activar(id: number): void {
    this.departamentoService.activar(id).subscribe({
      next: () => this.cargarDepartamentos(),
      error: () => this.error = 'No se pudo activar el departamento.'
    });
  }
}

