import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../core/models/rol.model';
import { RolService } from '../../../core/services/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  standalone: false,
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent implements OnInit {

  roles: Rol[] = [];
  cargando = true;
  error = '';

  constructor(
    private rolService: RolService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.cargando = true;
    this.rolService.listarTodos().subscribe({
      next: (data) => {
        this.roles = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/roles/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/roles/editar', id]);
  }

  desactivar(id: number): void {
    this.rolService.desactivar(id).subscribe({
      next: () => this.cargarRoles(),
      error: () => this.error = 'No se pudo desactivar el rol.'
    });
  }

  activar(id: number): void {
    this.rolService.activar(id).subscribe({
      next: () => this.cargarRoles(),
      error: () => this.error = 'No se pudo activar el rol.'
    });
  }
}

