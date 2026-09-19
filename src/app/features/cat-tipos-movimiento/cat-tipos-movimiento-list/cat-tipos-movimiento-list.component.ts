import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatTipoMovimiento } from '../../../core/models/cattipomovimiento.model';
import { CatTipoMovimientoService } from '../../../core/services/cattipomovimiento.service';

@Component({
  selector: 'app-cat-tipos-movimiento-list',
  standalone: false,
  templateUrl: './cat-tipos-movimiento-list.component.html',
  styleUrl: './cat-tipos-movimiento-list.component.css'
})
export class CatTiposMovimientoListComponent implements OnInit {

  catTiposMovimiento: CatTipoMovimiento[] = [];
  cargando = true;
  error = '';

  constructor(
    private catTipoMovimientoService: CatTipoMovimientoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.catTipoMovimientoService.listarTodos().subscribe({
      next: (datos) => {
        this.catTiposMovimiento = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/cat-tipos-movimiento/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/cat-tipos-movimiento/editar', id]);
  }

  desactivar(id: number): void {
    this.catTipoMovimientoService.desactivar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo desactivar el tipo de movimiento.'
    });
  }

  activar(id: number): void {
    this.catTipoMovimientoService.activar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo activar el tipo de movimiento.'
    });
  }
}
