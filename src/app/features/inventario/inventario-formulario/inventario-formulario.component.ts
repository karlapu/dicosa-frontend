import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../../core/models/inventario.model';
import { Producto } from '../../../core/models/producto.model';
import { Sucursal } from '../../../core/models/sucursal.model';
import { InventarioService } from '../../../core/services/inventario.service';
import { ProductoService } from '../../../core/services/producto.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventario-formulario',
  standalone: false,
  templateUrl: './inventario-formulario.component.html',
  styleUrl: './inventario-formulario.component.css'
})
export class InventarioFormularioComponent implements OnInit {

  inventario: Inventario = {
    idProducto: 0,
    idSucursal: 0,
    cantidad: 0
  };

  productos: Producto[] = [];
  sucursales: Sucursal[] = [];

  modoEdicion = false;
  idInventario: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private inventarioService: InventarioService,
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarSucursales();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idInventario = Number(idParam);
      this.cargarInventario(this.idInventario);
    }
  }

  cargarProductos(): void {
    this.productoService.listarTodos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.error = 'No se pudieron cargar los productos.'
    });
  }

  cargarSucursales(): void {
    this.sucursalService.listarTodos().subscribe({
      next: (data) => this.sucursales = data,
      error: () => this.error = 'No se pudieron cargar las sucursales.'
    });
  }

  cargarInventario(id: number): void {
    this.inventarioService.buscarPorId(id).subscribe({
      next: (data) => this.inventario = data,
      error: () => this.error = 'No se pudo cargar el registro de inventario.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idInventario
      ? this.inventarioService.actualizar(this.idInventario, this.inventario)
      : this.inventarioService.crear(this.inventario);

    peticion.subscribe({
      next: () => this.router.navigate(['/inventario']),
      error: (err) => {
        this.error = err?.error?.mensaje || 'Ocurrió un error al guardar el registro de inventario.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/inventario']);
  }
}
