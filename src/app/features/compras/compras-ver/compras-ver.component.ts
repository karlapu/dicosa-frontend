import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from '../../../core/models/comprar.model';
import { CompraService } from '../../../core/services/compra.service';

@Component({
  selector: 'app-compras-ver',
  standalone: false,
  templateUrl: './compras-ver.component.html',
  styleUrl: './compras-ver.component.css'
})
export class ComprasVerComponent implements OnInit {

  compra: Compra | null = null;
  cargando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compraService: CompraService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de compra inválido';
      return;
    }
    this.cargarCompra(id);
  }

  cargarCompra(id: number): void {
    this.cargando = true;
    this.compraService.buscarPorId(id).subscribe({
      next: (data) => {
        this.compra = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la compra';
        this.cargando = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/compras']);
  }
}
