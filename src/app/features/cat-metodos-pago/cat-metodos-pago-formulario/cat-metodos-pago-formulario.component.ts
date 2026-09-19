import { Component, OnInit } from '@angular/core';
import { CatMetodoPago } from '../../../core/models/catmetodopago.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatMetodoPagoService } from '../../../core/services/catmetodopago.service';

@Component({
  selector: 'app-cat-metodos-pago-formulario',
  standalone: false,
  templateUrl: './cat-metodos-pago-formulario.component.html',
  styleUrl: './cat-metodos-pago-formulario.component.css'
})
export class CatMetodoPagoFormularioComponent implements OnInit {

  catMetodoPago: CatMetodoPago = { nombre: '' };
  modoEdicion = false;
  idCatMetodoPago: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private catMetodoPagoService: CatMetodoPagoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idCatMetodoPago = Number(idParam);
      this.cargarCatMetodoPago(this.idCatMetodoPago);
    }
  }

  cargarCatMetodoPago(id: number): void {
    this.catMetodoPagoService.buscarPorId(id).subscribe({
      next: (data) => this.catMetodoPago = data,
      error: () => this.error = 'No se pudo cargar la información del método de pago.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idCatMetodoPago
      ? this.catMetodoPagoService.actualizar(this.idCatMetodoPago, this.catMetodoPago)
      : this.catMetodoPagoService.crear(this.catMetodoPago);

    peticion.subscribe({
      next: () => this.router.navigate(['/cat-metodos-pago']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el método de pago.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cat-metodos-pago']);
  }
}
