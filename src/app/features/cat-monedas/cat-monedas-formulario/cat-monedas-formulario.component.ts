import { Component, OnInit } from '@angular/core';
import { CatMoneda } from '../../../core/models/catmoneda.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatMonedaService } from '../../../core/services/catmoneda.service';

@Component({
  selector: 'app-cat-monedas-formulario',
  standalone: false,
  templateUrl: './cat-monedas-formulario.component.html',
  styleUrl: './cat-monedas-formulario.component.css'
})
export class CatMonedasFormularioComponent implements OnInit {

  catMoneda: CatMoneda = { nombre: '', simbolo: '' };
  modoEdicion = false;
  idMoneda: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private catMonedaService: CatMonedaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idMoneda = Number(idParam);
      this.cargarCatMoneda(this.idMoneda);
    }
  }

  cargarCatMoneda(id: number): void {
    this.catMonedaService.buscarPorId(id).subscribe({
      next: (data) => this.catMoneda = data,
      error: () => this.error = 'No se pudo cargar la información de la moneda.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idMoneda
      ? this.catMonedaService.actualizar(this.idMoneda, this.catMoneda)
      : this.catMonedaService.crear(this.catMoneda);

    peticion.subscribe({
      next: () => this.router.navigate(['/cat-monedas']),
      error: () => {
        this.error = 'Ocurrió un error al guardar la moneda.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cat-monedas']);
  }
}
