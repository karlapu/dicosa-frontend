import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-categorias-formulario',
  standalone: false,
  templateUrl: './categorias-formulario.component.html',
  styleUrl: './categorias-formulario.component.css'
})


export class CategoriasFormularioComponent implements OnInit {

  categoria: Categoria = { nombre: '', descripcion: '' };
  modoEdicion = false;
  idCategoria: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idCategoria = Number(idParam);
      this.cargarCategoria(this.idCategoria);
    }
  }

  cargarCategoria(id: number): void {
    this.categoriaService.buscarPorId(id).subscribe({
      next: (data) => this.categoria = data,
      error: () => this.error = 'No se pudo cargar la información de la categoría.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idCategoria
      ? this.categoriaService.actualizar(this.idCategoria, this.categoria)
      : this.categoriaService.crear(this.categoria);

    peticion.subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: () => {
        this.error = 'Ocurrió un error al guardar la categoría.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/categorias']);
  }
}
