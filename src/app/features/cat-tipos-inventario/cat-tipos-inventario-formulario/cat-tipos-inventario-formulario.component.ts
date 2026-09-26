import { Component, OnInit } from '@angular/core';
import { CatTipoInventario } from '../../../core/models/CatTipoinventario.model';
import { CatTipoInventarioService } from '../../../core/services/cartipoinventario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cat-tipos-inventario-formulario',
  standalone: false,
  templateUrl: './cat-tipos-inventario-formulario.component.html',
  styleUrl: './cat-tipos-inventario-formulario.component.css'
})

export class CatTiposInventarioFormularioComponent implements OnInit {

  tipo: CatTipoInventario = {
    nombre: ''
  };

  esEdicion = false;
  guardando = false;
  error = '';

  constructor(
    private tipoService: CatTipoInventarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.tipoService.buscarPorId(Number(id)).subscribe({
        next: (data) => this.tipo = data,
        error: () => this.error = 'No se pudo cargar el tipo de inventario'
      });
    }
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.esEdicion && this.tipo.idTipoInventario
      ? this.tipoService.actualizar(this.tipo.idTipoInventario, this.tipo)
      : this.tipoService.crear(this.tipo);

    peticion.subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/cat-tipos-inventario']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = err.error?.mensaje || 'No se pudo guardar el tipo de inventario';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cat-tipos-inventario']);
  }
}
