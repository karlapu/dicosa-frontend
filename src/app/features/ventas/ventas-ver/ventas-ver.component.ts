import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../core/models/venta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../../core/services/venta.service';

@Component({
  selector: 'app-ventas-ver',
  standalone: false,
  templateUrl: './ventas-ver.component.html',
  styleUrl: './ventas-ver.component.css'
})


export class VentasVerComponent implements OnInit {

  venta: Venta | null = null;
  cargando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de venta inválido';
      return;
    }
    this.cargarVenta(id);
  }

  cargarVenta(id: number): void {
    this.cargando = true;
    this.ventaService.buscarPorId(id).subscribe({
      next: (data) => {
        this.venta = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la venta';
        this.cargando = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/ventas']);
  }
}
