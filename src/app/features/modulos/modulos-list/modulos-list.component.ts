import { Component, OnInit } from '@angular/core';
import { Modulo } from '../../../core/models/modulo.model';
import { ModuloService } from '../../../core/services/modulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulos-list',
  standalone: false,
  templateUrl: './modulos-list.component.html',
  styleUrl: './modulos-list.component.css'
})
export class ModulosListComponent implements OnInit {

  modulos: Modulo[] = [];
  cargando = true;
  error = '';

  constructor(
    private moduloService: ModuloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarModulos();
  }

  cargarModulos(): void {
    this.cargando = true;
    this.moduloService.listarTodos().subscribe({
      next: (data) => {
        this.modulos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/modulos/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/modulos/editar', id]);
  }

  desactivar(id: number): void {
    this.moduloService.desactivar(id).subscribe({
      next: () => this.cargarModulos(),
      error: () => this.error = 'No se pudo desactivar el módulo.'
    });
  }

  activar(id: number): void {
    this.moduloService.activar(id).subscribe({
      next: () => this.cargarModulos(),
      error: () => this.error = 'No se pudo activar el módulo.'
    });
  }
}
