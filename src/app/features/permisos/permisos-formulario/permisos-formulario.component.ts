import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso } from '../../../core/models/permiso.model';
import { PermisoService } from '../../../core/services/permiso.service';
import { Menu } from '../../../core/models/menu.model';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-permisos-formulario',
  standalone: false,
  templateUrl: './permisos-formulario.component.html',
  styleUrl: './permisos-formulario.component.css'
})
export class PermisosFormularioComponent implements OnInit {

  permiso: Permiso = { idMenu: null, nombre: '', descripcion: '' };
  menus: Menu[] = [];
  modoEdicion = false;
  idPermiso: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private permisoService: PermisoService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMenus();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idPermiso = Number(idParam);
      this.cargarPermiso(this.idPermiso);
    }
  }

  cargarMenus(): void {
    this.menuService.listarTodos().subscribe({
      next: (data) => this.menus = data,
      error: () => this.error = 'No se pudieron cargar los menús.'
    });
  }

  cargarPermiso(id: number): void {
    this.permisoService.buscarPorId(id).subscribe({
      next: (data) => this.permiso = data,
      error: () => this.error = 'No se pudo cargar la información del permiso.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idPermiso
      ? this.permisoService.actualizar(this.idPermiso, this.permiso)
      : this.permisoService.crear(this.permiso);

    peticion.subscribe({
      next: () => this.router.navigate(['/permisos']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el permiso.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/permisos']);
  }
}
 
