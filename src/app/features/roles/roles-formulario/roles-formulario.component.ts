import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../core/models/rol.model';
import { RolService } from '../../../core/services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles-formulario',
  standalone: false,
  templateUrl: './roles-formulario.component.html',
  styleUrl: './roles-formulario.component.css'
})
export class RolesFormularioComponent  implements OnInit {

  rol: Rol = { nombre: '', descripcion: '' };
  modoEdicion = false;
  idRol: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.modoEdicion = true;
      this.idRol = Number(idParam);
      this.cargarRol(this.idRol);
    }
  }

  cargarRol(id: number): void {
    this.rolService.buscarPorId(id).subscribe({
      next: (data) => this.rol = data,
      error: () => this.error = 'No se pudo cargar la información del rol.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idRol
      ? this.rolService.actualizar(this.idRol, this.rol)
      : this.rolService.crear(this.rol);

    peticion.subscribe({
      next: () => this.router.navigate(['/roles']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el rol.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/roles']);
  }
}
