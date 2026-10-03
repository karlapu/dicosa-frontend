import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../core/models/pago.model';
import { PagoService } from '../../../core/services/pago.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagos-list',
  standalone: false,
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css'
})
export class PagosListComponent implements OnInit {

  pagos: Pago[] = [];
  cargando = false;
  error = '';

  constructor(
    private pagoService: PagoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.cargando = true;
    this.pagoService.listarTodos().subscribe({
      next: (data) => {
        this.pagos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los pagos';
        this.cargando = false;
      }
    });
  }

  verVenta(idVenta: number | null | undefined): void {
    if (idVenta) {
      this.router.navigate(['/ventas/ver', idVenta]);
    }
  }
}
