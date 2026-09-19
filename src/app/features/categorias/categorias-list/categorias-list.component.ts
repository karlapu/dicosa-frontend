import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-categorias-list',
  standalone: false,
  templateUrl: './categorias-list.component.html',
  styleUrl: './categorias-list.component.css'
})
export class CategoriasListComponent implements OnInit {

  categorias: Categoria[] = [];
  cargando = true;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando = true;
    this.categoriaService.listarTodos().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/categorias/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/categorias/editar', id]);
  }

  desactivar(id: number): void {
    this.categoriaService.desactivar(id).subscribe({
      next: () => this.cargarCategorias(),
      error: () => this.error = 'No se pudo desactivar la categoría.'
    });
  }

  activar(id: number): void {
    this.categoriaService.activar(id).subscribe({
      next: () => this.cargarCategorias(),
      error: () => this.error = 'No se pudo activar la categoría.'
    });
  }
}
