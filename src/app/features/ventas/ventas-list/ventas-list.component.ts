import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../core/models/venta.model';
import { VentaService } from '../../../core/services/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-list',
  standalone: false,
  templateUrl: './ventas-list.component.html',
  styleUrl: './ventas-list.component.css'
})
export class VentasListComponent implements OnInit {

  ventas: Venta[] = [];
  cargando = false;
  error = '';

  constructor(
    private ventaService: VentaService,
    private router: Router

  ) {}

  ngOnInit(): void {
 this.cargarVentas();

  }

  cargarVentas(): void {
    this.cargando = true;
    this.ventaService.listarTodos().subscribe({
      next: (data) => {
        this.ventas = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las ventas.';
        this.cargando = false;
      }
    });

  }

  nueva(): void {
    this.router.navigate(['/ventas/nueva']);
  }

  verDetalle(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/ventas/ver', id]);

    }
  }
}
