import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../../core/models/proveedor.model';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-list',
  standalone: false,
  templateUrl: './proveedores-list.component.html',
  styleUrl: './proveedores-list.component.css'
})

export class ProveedoresListComponent implements OnInit {

  proveedores: Proveedor[] = [];
  cargando = false;
  error = '';

  constructor(
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.cargando = true;
    this.error = '';

    this.proveedorService.listarTodos().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los proveedores.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/proveedores/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/proveedores/editar', id]);
  }

  desactivar(id: number): void {
    this.proveedorService.desactivar(id).subscribe({
      next: () => this.cargarProveedores(),
      error: () => this.error = 'No se pudo desactivar el proveedor.'
    });
  }

  activar(id: number): void {
    this.proveedorService.activar(id).subscribe({
      next: () => this.cargarProveedores(),
      error: () => this.error = 'No se pudo activar el proveedor.'
    });
  }
}
