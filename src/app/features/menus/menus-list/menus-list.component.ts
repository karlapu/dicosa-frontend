import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../core/models/menu.model';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-menus-list',
  standalone: false,
  templateUrl: './menus-list.component.html',
  styleUrl: './menus-list.component.css'
})
export class MenusListComponent implements OnInit {

  menus: Menu[] = [];
  cargando = true;
  error = '';

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus(): void {
    this.cargando = true;
    this.menuService.listarTodos().subscribe({
      next: (data) => {
        this.menus = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/menus/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/menus/editar', id]);
  }

  desactivar(id: number): void {
    this.menuService.desactivar(id).subscribe({
      next: () => this.cargarMenus(),
      error: () => this.error = 'No se pudo desactivar el menú.'
    });
  }

  activar(id: number): void {
    this.menuService.activar(id).subscribe({
      next: () => this.cargarMenus(),
      error: () => this.error = 'No se pudo activar el menú.'
    });
  }
}
 
