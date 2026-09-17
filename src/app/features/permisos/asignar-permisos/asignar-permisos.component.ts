import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../core/models/rol.model';
import { RolService } from '../../../core/services/rol.service';
import { Permiso } from '../../../core/models/permiso.model';
import { PermisoService } from '../../../core/services/permiso.service';
import { RolPermiso } from '../../../core/models/rolpermiso.model';
import { RolPermisoService } from '../../../core/services/rolpermiso.service';

@Component({
  selector: 'app-asignar-permisos',
  standalone: false,
  templateUrl: './asignar-permisos.component.html',
  styleUrl: './asignar-permisos.component.css'
})
export class AsignarPermisosComponent implements OnInit {

  roles: Rol[] = [];
  permisos: Permiso[] = [];
  idRolSeleccionado: number | null = null;
  permisosAsignados: number[] = [];
  cargando = false;
  error = '';

  constructor(
    private rolService: RolService,
    private permisoService: PermisoService,
    private rolPermisoService: RolPermisoService
  ) { }

  ngOnInit(): void {
    this.rolService.listarTodos().subscribe({
      next: (data) => this.roles = data,
      error: () => this.error = 'No se pudieron cargar los roles.'
    });

    this.permisoService.listarTodos().subscribe({
      next: (data) => this.permisos = data,
      error: () => this.error = 'No se pudieron cargar los permisos.'
    });
  }

  onCambiarRol(): void {
    if (!this.idRolSeleccionado) return;

    this.cargando = true;
    this.rolPermisoService.listarPorRol(this.idRolSeleccionado).subscribe({
      next: (data) => {
        this.permisosAsignados = data.map(rp => rp.idPermiso);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los permisos del rol.';
        this.cargando = false;
      }
    });
  }

  estaAsignado(idPermiso: number): boolean {
    return this.permisosAsignados.includes(idPermiso);
  }

  alternarPermiso(idPermiso: number): void {
    if (!this.idRolSeleccionado) return;

    if (this.estaAsignado(idPermiso)) {
      this.rolPermisoService.quitar(this.idRolSeleccionado, idPermiso).subscribe({
        next: () => this.permisosAsignados = this.permisosAsignados.filter(id => id !== idPermiso),
        error: () => this.error = 'No se pudo quitar el permiso.'
      });
    } else {
      this.rolPermisoService.asignar(this.idRolSeleccionado, idPermiso).subscribe({
        next: () => this.permisosAsignados.push(idPermiso),
        error: () => this.error = 'No se pudo asignar el permiso.'
      });
    }
  }
}
