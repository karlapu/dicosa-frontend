import { Component, OnInit } from '@angular/core';
import { Compra, DetalleCompra } from '../../../core/models/comprar.model';
import { Proveedor } from '../../../core/models/proveedor.model';
import { Sucursal } from '../../../core/models/sucursal.model';
import { Producto } from '../../../core/models/producto.model';
import { CompraService } from '../../../core/services/compra.service';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { ProductoService } from '../../../core/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras-formularios',
  standalone: false,
  templateUrl: './compras-formularios.component.html',
  styleUrl: './compras-formularios.component.css'
})
export class ComprasFormulariosComponent  implements OnInit {

  compra: Compra = {
    idProveedor: null,
    idSucursal: null,
    detalles: []
  };

  proveedores: Proveedor[] = [];
  sucursales: Sucursal[] = [];
  productos: Producto[] = [];

  guardando = false;
  error = '';

  constructor(
    private compraService: CompraService,
    private proveedorService: ProveedorService,
    private sucursalService: SucursalService,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proveedorService.listarTodos().subscribe({
      next: (data) => this.proveedores = data.filter(item => item.estado === 'ACTIVO'),
      error: () => this.error = 'No se pudieron cargar los proveedores'
    });

    this.sucursalService.listarTodos().subscribe({
      next: (data) => this.sucursales = data.filter(item => item.estado === 'ACTIVO'),
      error: () => this.error = 'No se pudieron cargar las sucursales'
    });

    this.productoService.listarTodos().subscribe({
      next: (data) => this.productos = data.filter(item => item.estado === 'ACTIVO'),
      error: () => this.error = 'No se pudieron cargar los productos'
    });

    this.agregarLinea();
  }

  agregarLinea(): void {
    this.compra.detalles.push({
      idProducto: null,
      cantidad: null,
      precioUnitario: null
    });
  }

  quitarLinea(index: number): void {
    this.compra.detalles.splice(index, 1);
    if (this.compra.detalles.length === 0) {
      this.agregarLinea();
    }
  }

  calcularSubtotalLinea(detalle: DetalleCompra): number {
    if (!detalle.cantidad || !detalle.precioUnitario) {
      return 0;
    }
    return detalle.cantidad * detalle.precioUnitario;
  }

  calcularTotal(): number {
    return this.compra.detalles.reduce((total, d) => total + this.calcularSubtotalLinea(d), 0);
  }

  formularioValido(): boolean {
    if (!this.compra.idProveedor || !this.compra.idSucursal) {
      return false;
    }
    if (this.compra.detalles.length === 0) {
      return false;
    }
    return this.compra.detalles.every(d =>
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

    this.compraService.crear(this.compra).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/compras']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = err.error?.mensaje || 'No se pudo registrar la compra';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/compras']);
  }
}
 