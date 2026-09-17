import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permiso } from '../../../core/models/permiso.model';
import { PermisoService } from '../../../core/services/permiso.service';

@Component({
  selector: 'app-permisos-list',
  standalone: false,
  templateUrl: './permisos-list.component.html',
  styleUrl: './permisos-list.component.css'
})
export class PermisosListComponent implements OnInit {

  permisos: Permiso[] = [];
  cargando = true;
  error = '';

  constructor(
    private permisoService: PermisoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarPermisos();
  }

  cargarPermisos(): void {
    this.cargando = true;
    this.permisoService.listarTodos().subscribe({
      next: (data) => {
        this.permisos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/permisos/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/permisos/editar', id]);
  }

  desactivar(id: number): void {
    this.permisoService.desactivar(id).subscribe({
      next: () => this.cargarPermisos(),
      error: () => this.error = 'No se pudo desactivar el permiso.'
    });
  }

  activar(id: number): void {
    this.permisoService.activar(id).subscribe({
      next: () => this.cargarPermisos(),
      error: () => this.error = 'No se pudo activar el permiso.'
    });
  }
}
