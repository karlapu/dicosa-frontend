import { Component, OnInit } from '@angular/core';
import { Municipio } from '../../../core/models/municipio.model';
import { MunicipioService } from '../../../core/services/municipio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipios-list',
  standalone: false,
  templateUrl: './municipios-list.component.html',
  styleUrl: './municipios-list.component.css'
})
export class MunicipiosListComponent implements OnInit {

  municipios: Municipio[] = [];

  cargando = false;
  error = '';

  constructor(
    private municipioService: MunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMunicipios();
  }

  cargarMunicipios(): void {
    this.cargando = true;
    this.error = '';

    this.municipioService.listarTodos().subscribe({
      next: (data) => {
        this.municipios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los municipios.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/municipios/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/municipios/editar', id]);
  }

  desactivar(id: number): void {
    if (!confirm('¿Está seguro de desactivar este municipio?')) {
      return;
    }

    this.municipioService.desactivar(id).subscribe({
      next: () => this.cargarMunicipios(),
      error: () => {
        this.error = 'No se pudo desactivar el municipio.';
      }
    });
  }

  activar(id: number): void {
    this.municipioService.activar(id).subscribe({
      next: () => this.cargarMunicipios(),
      error: () => {
        this.error = 'No se pudo activar el municipio.';
      }
    });
  }
}
