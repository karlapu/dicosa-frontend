import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../../core/models/inventario.model';
import { InventarioService } from '../../../core/services/inventario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-list',
  standalone: false,
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css'
})
export class InventarioListComponent implements OnInit {

  registros: Inventario[] = [];
  cargando = false;
  error = '';

  constructor(
    private inventarioService: InventarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.cargando = true;
    this.error = '';

    this.inventarioService.listarTodos().subscribe({
      next: (data) => {
        this.registros = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el inventario.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/inventario/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/inventario/editar', id]);
  }

  desactivar(id: number): void {
    this.inventarioService.desactivar(id).subscribe({
      next: () => this.cargarInventario(),
      error: () => this.error = 'No se pudo desactivar el registro.'
    });
  }

  activar(id: number): void {
    this.inventarioService.activar(id).subscribe({
      next: () => this.cargarInventario(),
      error: () => this.error = 'No se pudo activar el registro.'
    });
  }
}

