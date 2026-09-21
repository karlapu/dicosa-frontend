import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatTipoSucursal } from '../../../core/models/cattiposucursal.model';
import { CatTipoSucursalService } from '../../../core/services/cattiposucursal.service';

@Component({
  selector: 'app-cat-tipos-sucursal-list',
  standalone: false,
  templateUrl: './cat-tipos-sucursal-list.component.html',
  styleUrl: './cat-tipos-sucursal-list.component.css'
})
export class CatTiposSucursalListComponent implements OnInit {

  catTiposSucursal: CatTipoSucursal[] = [];
  cargando = true;
  error = '';

  constructor(
    private catTipoSucursalService: CatTipoSucursalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.catTipoSucursalService.listarTodos().subscribe({
      next: (datos) => {
        this.catTiposSucursal = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/cat-tipos-sucursal/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/cat-tipos-sucursal/editar', id]);
  }

  desactivar(id: number): void {
    this.catTipoSucursalService.desactivar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo desactivar el tipo de sucursal.'
    });
  }

  activar(id: number): void {
    this.catTipoSucursalService.activar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo activar el tipo de sucursal.'
    });
  }
}
