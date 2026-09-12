import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modulo } from '../../../core/models/modulo.model';
import { ModuloService } from '../../../core/services/modulo.service';

@Component({
  selector: 'app-modulos-formulario',
  standalone: false,
  templateUrl: './modulos-formulario.component.html',
  styleUrl: './modulos-formulario.component.css'
})
export class ModulosFormularioComponent implements OnInit {

  modulo: Modulo = { nombre: '', descripcion: '' };
  modoEdicion = false;
  idModulo: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private moduloService: ModuloService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idModulo = Number(idParam);
      this.cargarModulo(this.idModulo);
    }
  }

  cargarModulo(id: number): void {
    this.moduloService.buscarPorId(id).subscribe({
      next: (data) => this.modulo = data,
      error: () => this.error = 'No se pudo cargar la información del módulo.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idModulo
      ? this.moduloService.actualizar(this.idModulo, this.modulo)
      : this.moduloService.crear(this.modulo);

    peticion.subscribe({
      next: () => this.router.navigate(['/modulos']),
      error: () => {
        this.error = 'Ocurrió un error al guardar el módulo.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/modulos']);
  }
}
