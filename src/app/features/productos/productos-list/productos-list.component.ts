import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-list',
  standalone: false,
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css'
})
export class ProductosListComponent implements OnInit {

  productos: Producto[] = [];
  cargando = false;
  error = '';

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';

    this.productoService.listarTodos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/productos/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/productos/editar', id]);
  }

  desactivar(id: number): void {
    this.productoService.desactivar(id).subscribe({
      next: () => this.cargarProductos(),
      error: () => this.error = 'No se pudo desactivar el producto.'
    });
  }

  activar(id: number): void {
    this.productoService.activar(id).subscribe({
      next: () => this.cargarProductos(),
      error: () => this.error = 'No se pudo activar el producto.'
    });
  }
}
