import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../core/models/rol.model';
import { RolService } from '../../../core/services/rol.service';

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

  constructor(private rolService: RolService) { }

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
}
