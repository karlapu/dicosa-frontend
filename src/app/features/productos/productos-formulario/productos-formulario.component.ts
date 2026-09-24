import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';
import { Categoria } from '../../../core/models/categoria.model';
import { ProductoService } from '../../../core/services/producto.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos-formulario',
  standalone: false,
  templateUrl: './productos-formulario.component.html',
  styleUrl: './productos-formulario.component.css'
})
export class ProductosFormularioComponent implements OnInit {

  producto: Producto = {
    idCategoria: 0,
    nombre: '',
    codigoBarra: '',
    descripcion: '',
    precioCosto: 0,
    precioVenta: 0,
    stockMinimo: 0,
    imagen: ''
  };

  categorias: Categoria[] = [];

  modoEdicion = false;
  idProducto: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idProducto = Number(idParam);
      this.cargarProducto(this.idProducto);
    }
  }

  cargarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.error = 'No se pudieron cargar las categorías.'
    });
  }

  cargarProducto(id: number): void {
    this.productoService.buscarPorId(id).subscribe({
      next: (data) => this.producto = data,
      error: () => this.error = 'No se pudo cargar la información del producto.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idProducto
      ? this.productoService.actualizar(this.idProducto, this.producto)
      : this.productoService.crear(this.producto);

    peticion.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el producto.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }
}
