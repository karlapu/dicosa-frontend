import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatMetodoPago } from '../../../core/models/catmetodopago.model';
import { CatMetodoPagoService } from '../../../core/services/catmetodopago.service';

@Component({
  selector: 'app-cat-metodos-pago-list',
  standalone: false,
  templateUrl: './cat-metodos-pago-list.component.html',
  styleUrl: './cat-metodos-pago-list.component.css'
})
export class CatMetodoPagoListComponent implements OnInit {

  catMetodoPagos: CatMetodoPago[] = [];
  cargando = true;
  error = '';

  constructor(
    private catMetodoPagoService: CatMetodoPagoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.catMetodoPagoService.listarTodos().subscribe({
      next: (datos) => {
        this.catMetodoPagos = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/cat-metodos-pago/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/cat-metodos-pago/editar', id]);
  }

  desactivar(id: number): void {
    this.catMetodoPagoService.desactivar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo desactivar el método de pago.'
    });
  }

  activar(id: number): void {
    this.catMetodoPagoService.activar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo activar el método de pago.'
    });
  }
}
