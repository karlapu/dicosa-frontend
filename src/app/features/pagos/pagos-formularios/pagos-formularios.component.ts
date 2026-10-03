import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pago, DetallePago, SaldoVenta } from '../../../core/models/pago.model';
import { Venta } from '../../../core/models/venta.model';
import { CatMetodoPago } from '../../../core/models/catmetodopago.model';
import { PagoService } from '../../../core/services/pago.service';
import { VentaService } from '../../../core/services/venta.service';
import { CatMetodoPagoService } from '../../../core/services/catmetodopago.service';

@Component({
  selector: 'app-pagos-formularios',
  standalone: false,
  templateUrl: './pagos-formularios.component.html',
  styleUrl: './pagos-formularios.component.css'
})
export class PagosFormulariosComponent implements OnInit {

  idVenta!: number;
  venta: Venta | null = null;
  saldo: SaldoVenta | null = null;
  metodosPago: CatMetodoPago[] = [];

  pago: Pago = {
    idVenta: null,
    detalles: []
  };

  cargando = false;
  guardando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoService: PagoService,
    private ventaService: VentaService,
    private catMetodoPagoService: CatMetodoPagoService
  ) { }

  ngOnInit(): void {
    this.idVenta = Number(this.route.snapshot.paramMap.get('idVenta'));
    if (!this.idVenta) {
      this.error = 'ID de venta inválido';
      return;
    }

    this.pago.idVenta = this.idVenta;
    this.cargando = true;

    this.ventaService.buscarPorId(this.idVenta).subscribe({
      next: (data) => this.venta = data,
      error: () => this.error = 'No se pudo cargar la venta'
    });

    this.pagoService.obtenerSaldo(this.idVenta).subscribe({
      next: (data) => {
        this.saldo = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo calcular el saldo de la venta';
        this.cargando = false;
      }
    });

    this.catMetodoPagoService.listarTodos().subscribe({
      next: (data) => this.metodosPago = data,
      error: () => this.error = 'No se pudieron cargar los métodos de pago'
    });

    this.agregarLinea();
  }

  agregarLinea(): void {
    this.pago.detalles.push({
      idMetodoPago: null,
      monto: null
    });
  }

  quitarLinea(index: number): void {
    this.pago.detalles.splice(index, 1);
    if (this.pago.detalles.length === 0) {
      this.agregarLinea();
    }
  }

  calcularTotalPago(): number {
    return this.pago.detalles.reduce((total, d) => total + (d.monto || 0), 0);
  }

  excedeSaldo(): boolean {
    if (!this.saldo) {
      return false;
    }
    return this.calcularTotalPago() > this.saldo.saldoPendiente;
  }

  formularioValido(): boolean {
    if (!this.pago.detalles.every(d => d.idMetodoPago !== null && d.monto !== null && d.monto > 0)) {
      return false;
    }
    if (this.calcularTotalPago() <= 0) {
      return false;
    }
    return !this.excedeSaldo();
  }

  guardar(): void {
    if (!this.formularioValido()) {
      return;
    }

    this.guardando = true;
    this.error = '';

    this.pagoService.crear(this.pago).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/ventas/ver', this.idVenta]);
      },
      error: (err) => {
        this.guardando = false;
        this.error = err.error?.mensaje || 'No se pudo registrar el pago';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/ventas/ver', this.idVenta]);
  }
}
