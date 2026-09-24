import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursal } from '../../../core/models/sucursal.model';
import { SucursalService } from '../../../core/services/sucursal.service';

@Component({
  selector: 'app-sucursales-list',
  standalone: false,
  templateUrl: './sucursales-list.component.html',
  styleUrl: './sucursales-list.component.css'
})
export class SucursalesListComponent implements OnInit {

  sucursales: Sucursal[] = [];
  cargando = false;
  error = '';

  constructor(
    private sucursalService: SucursalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales(): void {
    this.cargando = true;
    this.error = '';

    this.sucursalService.listarTodos().subscribe({
      next: (data) => {
        this.sucursales = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las sucursales.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/sucursales/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/sucursales/editar', id]);
  }

  desactivar(id: number): void {
    this.sucursalService.desactivar(id).subscribe({
      next: () => this.cargarSucursales(),
      error: () => this.error = 'No se pudo desactivar la sucursal.'
    });
  }

  activar(id: number): void {
    this.sucursalService.activar(id).subscribe({
      next: () => this.cargarSucursales(),
      error: () => this.error = 'No se pudo activar la sucursal.'
    });
  }
}
