import { Component, OnInit } from '@angular/core';
import { MovimientoInventario } from '../../../core/models/movimientoinventario.model';
import { Producto } from '../../../core/models/producto.model';
import { Sucursal } from '../../../core/models/sucursal.model';
import { CatTipoMovimiento } from '../../../core/models/cattipomovimiento.model';
import { MovimientoInventarioService } from '../../../core/services/movimientoinventario.service';
import { ProductoService } from '../../../core/services/producto.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { CatTipoMovimientoService } from '../../../core/services/cattipomovimiento.service';
import { Router } from '@angular/router';
type NaturalezaMovimiento = 'ENTRADA' | 'SALIDA' | 'TRASLADO';
@Component({
  selector: 'app-movimientos-formulario',
  standalone: false,
  templateUrl: './movimientos-formulario.component.html',
  styleUrl: './movimientos-formulario.component.css'
})

export class MovimientosFormularioComponent implements OnInit {

  movimiento: MovimientoInventario = {
    idProducto: 0,
    idTipoMovimiento: 0,
    idSucursalOrigen: null,
    idSucursalDestino: null,
    cantidad: 0,
    descripcion: ''
  };
  naturaleza: NaturalezaMovimiento = 'ENTRADA';
productos: Producto[] = [];
  sucursales: Sucursal[] = [];
  tiposMovimiento: CatTipoMovimiento[] = [];

  guardando = false;
  error = '';

  constructor(
    private movimientoService: MovimientoInventarioService,
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    private tipoMovimientoService: CatTipoMovimientoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productoService.listarTodos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.error = 'No se pudieron cargar los productos.'
    });

    this.sucursalService.listarTodos().subscribe({
      next: (data) => this.sucursales = data,
      error: () => this.error = 'No se pudieron cargar las sucursales.'
    });

    this.tipoMovimientoService.listarTodos().subscribe({
      next: (data) => this.tiposMovimiento = data,
      error: () => this.error = 'No se pudieron cargar los tipos de movimiento.'
    });
  }

  cambiarNaturaleza(valor: NaturalezaMovimiento): void {
    this.naturaleza = valor;
    // Al cambiar de tipo, se limpian los campos de sucursal que ya no aplican.
    this.movimiento.idSucursalOrigen = null;
    this.movimiento.idSucursalDestino = null;
  }

  formularioValido(): boolean {
    if (!this.movimiento.idProducto) return false;
    if (!this.movimiento.idTipoMovimiento) return false;
    if (!this.movimiento.cantidad || this.movimiento.cantidad <= 0) return false;

    if (this.naturaleza === 'ENTRADA') return !!this.movimiento.idSucursalDestino;
    if (this.naturaleza === 'SALIDA') return !!this.movimiento.idSucursalOrigen;
    return !!this.movimiento.idSucursalOrigen && !!this.movimiento.idSucursalDestino;
  }

  guardar(): void {
    if (!this.formularioValido()) {
      this.error = 'Completa todos los campos obligatorios antes de guardar.';
      return;
    }

    this.guardando = true;
    this.error = '';

    this.movimientoService.registrar(this.movimiento).subscribe({
      next: () => this.router.navigate(['/movimientos']),
      error: (err) => {
        this.error = err?.error?.mensaje || 'Ocurrió un error al registrar el movimiento.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/movimientos']);
  }
}
