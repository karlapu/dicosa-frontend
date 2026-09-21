import { Component, OnInit } from '@angular/core';
import { CatTipoSucursal } from '../../../core/models/cattiposucursal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatTipoSucursalService } from '../../../core/services/cattiposucursal.service';

@Component({
  selector: 'app-cat-tipos-sucursal-formulario',
  standalone: false,
  templateUrl: './cat-tipos-sucursal-formulario.component.html',
  styleUrl: './cat-tipos-sucursal-formulario.component.css'
})
export class CatTiposSucursalFormularioComponent implements OnInit {

  catTipoSucursal: CatTipoSucursal = { nombre: '' };
  modoEdicion = false;
  idTipoSucursal: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private catTipoSucursalService: CatTipoSucursalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idTipoSucursal = Number(idParam);
      this.cargarCatTipoSucursal(this.idTipoSucursal);
    }
  }

  cargarCatTipoSucursal(id: number): void {
    this.catTipoSucursalService.buscarPorId(id).subscribe({
      next: (data) => this.catTipoSucursal = data,
      error: () => this.error = 'No se pudo cargar la información del tipo de sucursal.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idTipoSucursal
      ? this.catTipoSucursalService.actualizar(this.idTipoSucursal, this.catTipoSucursal)
      : this.catTipoSucursalService.crear(this.catTipoSucursal);

    peticion.subscribe({
      next: () => this.router.navigate(['/cat-tipos-sucursal']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el tipo de sucursal.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cat-tipos-sucursal']);
  }
}
