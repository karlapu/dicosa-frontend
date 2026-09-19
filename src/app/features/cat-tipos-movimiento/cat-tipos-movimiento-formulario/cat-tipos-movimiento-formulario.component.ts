import { Component, OnInit } from '@angular/core';
import { CatTipoMovimiento } from '../../../core/models/cattipomovimiento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatTipoMovimientoService } from '../../../core/services/cattipomovimiento.service';

@Component({
  selector: 'app-cat-tipos-movimiento-formulario',
  standalone: false,
  templateUrl: './cat-tipos-movimiento-formulario.component.html',
  styleUrl: './cat-tipos-movimiento-formulario.component.css'
})
export class CatTiposMovimientoFormularioComponent implements OnInit {

  catTipoMovimiento: CatTipoMovimiento = { nombre: '' };
  modoEdicion = false;
  idTipoMovimiento: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private catTipoMovimientoService: CatTipoMovimientoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idTipoMovimiento = Number(idParam);
      this.cargarCatTipoMovimiento(this.idTipoMovimiento);
    }
  }

  cargarCatTipoMovimiento(id: number): void {
    this.catTipoMovimientoService.buscarPorId(id).subscribe({
      next: (data) => this.catTipoMovimiento = data,
      error: () => this.error = 'No se pudo cargar la información del tipo de movimiento.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idTipoMovimiento
      ? this.catTipoMovimientoService.actualizar(this.idTipoMovimiento, this.catTipoMovimiento)
      : this.catTipoMovimientoService.crear(this.catTipoMovimiento);

    peticion.subscribe({
      next: () => this.router.navigate(['/cat-tipos-movimiento']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el tipo de movimiento.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cat-tipos-movimiento']);
  }
}
