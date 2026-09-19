import { Component, OnInit } from '@angular/core';
import { CatMoneda } from '../../../core/models/catmoneda.model';
import { CatMonedaService } from '../../../core/services/catmoneda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-monedas-list',
  standalone: false,
  templateUrl: './cat-monedas-list.component.html',
  styleUrl: './cat-monedas-list.component.css'
})
export class CatMonedasListComponent implements OnInit {

  catMonedas: CatMoneda[] = [];
  cargando = true;
  error = '';

  constructor(
    private catMonedaService: CatMonedaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.catMonedaService.listarTodos().subscribe({
      next: (datos) => {
        this.catMonedas = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/cat-monedas/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/cat-monedas/editar', id]);
  }

  desactivar(id: number): void {
    this.catMonedaService.desactivar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo desactivar la moneda.'
    });
  }

  activar(id: number): void {
    this.catMonedaService.activar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => this.error = 'No se pudo activar la moneda.'
    });
  }
}

