import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../../core/models/menu.model';
import { MenuService } from '../../../core/services/menu.service';
import { Modulo } from '../../../core/models/modulo.model';
import { ModuloService } from '../../../core/services/modulo.service';

@Component({
  selector: 'app-menus-formulario',
  standalone: false,
  templateUrl: './menus-formulario.component.html',
  styleUrl: './menus-formulario.component.css'
})
export class MenusFormularioComponent implements OnInit {

  menu: Menu = { idModulo: null, nombre: '', ruta: '' };
  modulos: Modulo[] = [];
  modoEdicion = false;
  idMenu: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private menuService: MenuService,
    private moduloService: ModuloService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarModulos();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idMenu = Number(idParam);
      this.cargarMenu(this.idMenu);
    }
  }

  cargarModulos(): void {
    this.moduloService.listarTodos().subscribe({
      next: (data) => this.modulos = data,
      error: () => this.error = 'No se pudieron cargar los módulos.'
    });
  }

  cargarMenu(id: number): void {
    this.menuService.buscarPorId(id).subscribe({
      next: (data) => this.menu = data,
      error: () => this.error = 'No se pudo cargar la información del menú.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idMenu
      ? this.menuService.actualizar(this.idMenu, this.menu)
      : this.menuService.crear(this.menu);

    peticion.subscribe({
      next: () => this.router.navigate(['/menus']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el menú.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/menus']);
  }
}
