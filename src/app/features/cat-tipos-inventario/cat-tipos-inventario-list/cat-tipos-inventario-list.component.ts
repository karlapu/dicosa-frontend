import { Component, OnInit } from '@angular/core';
import { CatTipoInventario } from '../../../core/models/CatTipoinventario.model';
import { CatTipoInventarioService } from '../../../core/services/cartipoinventario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-tipos-inventario-list',
  standalone: false,
  templateUrl: './cat-tipos-inventario-list.component.html',
  styleUrl: './cat-tipos-inventario-list.component.css'
})
export class CatTiposInventarioListComponent implements OnInit {

  tipos: CatTipoInventario[] = [];
  cargando = false;
  error = '';

  constructor(
    private tipoService: CatTipoInventarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos(): void {
    this.cargando = true;
    this.tipoService.listarTodos().subscribe({
      next: (data) => {
        this.tipos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los tipos de inventario';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/cat-tipos-inventario/nuevo']);
  }

  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/cat-tipos-inventario/editar', id]);
    }
  }

  desactivar(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Desactivar este tipo de inventario?')) {
      this.tipoService.desactivar(id).subscribe({
        next: () => this.cargarTipos(),
        error: () => this.error = 'No se pudo desactivar'
      });
    }
  }

  activar(id: number | undefined): void {
    if (!id) return;
    this.tipoService.activar(id).subscribe({
      next: () => this.cargarTipos(),
      error: () => this.error = 'No se pudo activar'
    });
  }
}

