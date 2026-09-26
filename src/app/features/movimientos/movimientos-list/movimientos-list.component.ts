import { Component, OnInit } from '@angular/core';
import { MovimientoInventario } from '../../../core/models/movimientoinventario.model';
import { MovimientoInventarioService } from '../../../core/services/movimientoinventario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-list',
  standalone: false,
  templateUrl: './movimientos-list.component.html',
  styleUrl: './movimientos-list.component.css'
})

export class MovimientosListComponent implements OnInit {

  movimientos: MovimientoInventario[] = [];
  cargando = false;
  error = '';

  constructor(
    private movimientoService: MovimientoInventarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.cargando = true;
    this.error = '';

    this.movimientoService.listarTodos().subscribe({
      next: (data) => {
        // Los más recientes primero
        this.movimientos = data.sort((a, b) =>
          (b.fechaMovimiento || '').localeCompare(a.fechaMovimiento || '')
        );
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los movimientos.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/movimientos/nuevo']);
  }

  tipoDeMovimiento(mov: MovimientoInventario): string {
    if (mov.idSucursalOrigen && mov.idSucursalDestino) return 'Traslado';
    if (mov.idSucursalOrigen) return 'Salida';
    if (mov.idSucursalDestino) return 'Entrada';
    return '—';
  }
}
