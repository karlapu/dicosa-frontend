import { Component, OnInit } from '@angular/core';
import { Auditoria } from '../../../core/models/auditoria.model';
import { AuditoriaService } from '../../../core/services/auditoria.service';

@Component({
  selector: 'app-auditoria-list',
  standalone: false,
  templateUrl: './auditoria-list.component.html',
  styleUrl: './auditoria-list.component.css'
})

export class AuditoriaListComponent implements OnInit {

  registros: Auditoria[] = [];
  cargando = false;
  error = '';

  // filtros
  filtroTabla = '';
  filtroDesde = '';
  filtroHasta = '';

  constructor(private auditoriaService: AuditoriaService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';

    this.auditoriaService.listar({
      tabla: this.filtroTabla || undefined,
      desde: this.filtroDesde ? this.filtroDesde + ':00' : undefined,
      hasta: this.filtroHasta ? this.filtroHasta + ':00' : undefined
    }).subscribe({
      next: (data) => {
        this.registros = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el historial de auditoría';
        this.cargando = false;
      }
    });
  }

  limpiarFiltros(): void {
    this.filtroTabla = '';
    this.filtroDesde = '';
    this.filtroHasta = '';
    this.cargar();
  }
}
