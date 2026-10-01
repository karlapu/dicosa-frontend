import { Component, OnInit } from '@angular/core';
import { Venta, DetalleVenta } from '../../../core/models/venta.model';
import { Cliente } from '../../../core/models/cliente.model';
import { Sucursal } from '../../../core/models/sucursal.model';
import { Producto } from '../../../core/models/producto.model';
import { VentaService } from '../../../core/services/venta.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { ProductoService } from '../../../core/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-formularios',
  standalone: false,
  templateUrl: './ventas-formularios.component.html',
  styleUrl: './ventas-formularios.component.css'
})
export class VentasFormulariosComponent implements OnInit {

  venta: Venta = {
    idCliente: null,
    idSucursal: null,
    detalles: []
  };

  clientes: Cliente[] = [];
  sucursales: Sucursal[] = [];
  productos: Producto[] = [];

  guardando = false;
  error = '';

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private sucursalService: SucursalService,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.listarTodos().subscribe({
      next: (data) => this.clientes = data,
      error: () => this.error = 'No se pudieron cargar los clientes'
    });

    this.sucursalService.listarTodos().subscribe({
      next: (data) => this.sucursales = data,
      error: () => this.error = 'No se pudieron cargar las sucursales'
    });

    this.productoService.listarTodos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.error = 'No se pudieron cargar los productos'
    });

    this.agregarLinea();
  }

  agregarLinea(): void {
    this.venta.detalles.push({
      idProducto: null,
      cantidad: null,
      precioUnitario: null
    });
  }

  quitarLinea(index: number): void {
    this.venta.detalles.splice(index, 1);
    if (this.venta.detalles.length === 0) {
      this.agregarLinea();
    }
  }


  onProductoSeleccionado(detalle: DetalleVenta): void {
    const producto = this.productos.find(p => p.idProducto === detalle.idProducto);
    if (producto) {
      detalle.precioUnitario = producto.precioVenta;
    }
  }

  calcularSubtotalLinea(detalle: DetalleVenta): number {
    if (!detalle.cantidad || !detalle.precioUnitario) {
      return 0;
    }
    return detalle.cantidad * detalle.precioUnitario;
  }

  calcularTotal(): number {
    return this.venta.detalles.reduce((total, d) => total + this.calcularSubtotalLinea(d), 0);
  }

  formularioValido(): boolean {
    if (!this.venta.idCliente || !this.venta.idSucursal) {
      return false;
    }
    if (this.venta.detalles.length === 0) {
      return false;
    }
    return this.venta.detalles.every(d =>
      d.idProducto !== null &&
      d.cantidad !== null && d.cantidad > 0 &&
      d.precioUnitario !== null && d.precioUnitario > 0
    );
  }

  guardar(): void {
    if (!this.formularioValido()) {
      return;
    }

    this.guardando = true;
    this.error = '';

    this.ventaService.crear(this.venta).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/ventas']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = err.error?.mensaje || 'No se pudo registrar la venta';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/ventas']);
  }
}
