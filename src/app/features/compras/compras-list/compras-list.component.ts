import { Component, OnInit } from '@angular/core';
import { Compra } from '../../../core/models/comprar.model';
import { CompraService } from '../../../core/services/compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras-list',
  standalone: false,
  templateUrl: './compras-list.component.html',
  styleUrl: './compras-list.component.css'
})
export class ComprasListComponent implements OnInit {

compras: Compra[] = [];
  cargando = false;
  error = '';

  constructor(
    private compraService: CompraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.cargando = true;
    this.compraService.listarTodos().subscribe({
      next: (data) => {
        this.compras = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las compras';
        this.cargando = false;
      }
    });
  }

  nueva(): void {
    this.router.navigate(['/compras/nueva']);
  }

  verDetalle(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/compras/ver', id]);
    }
  }
}

