import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { environment } from '../../../../environments/environment';

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
  subiendoImagen = false;
  vistaLocal = '';
  errorImagen = false;
  arrastrando = false;
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

  get imagenPreviewUrl(): string {
    if (!this.producto.imagen) {
      return '';
    }
    const urlBase = environment.apiUrl.replace('/api', '');
    return `${urlBase}${this.producto.imagen}`;
  }

  get imagenMostrada(): string {
    return this.vistaLocal || this.imagenPreviewUrl;
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.procesarArchivo(input.files[0]);
    input.value = '';
  }

  onArrastrar(event: DragEvent): void {
    event.preventDefault();
    this.arrastrando = true;
  }

  onSalirArrastre(event: DragEvent): void {
    event.preventDefault();
    this.arrastrando = false;
  }

  onSoltar(event: DragEvent): void {
    event.preventDefault();
    this.arrastrando = false;
    const archivo = event.dataTransfer?.files?.[0];
    if (archivo) {
      this.procesarArchivo(archivo);
    }
  }

  private procesarArchivo(archivo: File): void {
    if (!archivo.type.startsWith('image/')) {
      this.error = 'El archivo debe ser una imagen (JPG, PNG o WEBP).';
      return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
      this.error = 'La imagen no debe pesar más de 5 MB.';
      return;
    }

    this.error = '';
    this.errorImagen = false;
    this.subiendoImagen = true;
    if (this.vistaLocal) {
      URL.revokeObjectURL(this.vistaLocal);
    }
    this.vistaLocal = URL.createObjectURL(archivo);

    this.productoService.subirImagen(archivo).subscribe({
      next: (respuesta) => {
        this.producto.imagen = respuesta.imagen;
        this.subiendoImagen = false;
      },
      error: () => {
        this.error = 'No se pudo subir la imagen.';
        this.quitarImagen();
        this.subiendoImagen = false;
      }
    });
  }

  quitarImagen(): void {
    if (this.vistaLocal) {
      URL.revokeObjectURL(this.vistaLocal);
    }
    this.vistaLocal = '';
    this.errorImagen = false;
    this.producto.imagen = '';
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
