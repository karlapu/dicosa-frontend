import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sucursal } from '../../../core/models/sucursal.model';
import { SucursalService } from '../../../core/services/sucursal.service';
import { Municipio } from '../../../core/models/municipio.model';
import { MunicipioService } from '../../../core/services/municipio.service';
import { CatTipoSucursal } from '../../../core/models/cattiposucursal.model';
import { CatTipoSucursalService } from '../../../core/services/cattiposucursal.service';

@Component({
  selector: 'app-sucursales-formulario',
  standalone: false,
  templateUrl: './sucursales-formulario.component.html',
  styleUrl: './sucursales-formulario.component.css'
})
export class SucursalesFormularioComponent implements OnInit {

  sucursal: Sucursal = {
    idTipoSucursal: 0,
    idMunicipio: 0,
    nombre: '',
    direccion: '',
    telefono: ''
  };

  municipios: Municipio[] = [];
  tiposSucursal: CatTipoSucursal[] = [];

  modoEdicion = false;
  idSucursal: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private sucursalService: SucursalService,
    private municipioService: MunicipioService,
    private catTipoSucursalService: CatTipoSucursalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMunicipios();
    this.cargarTiposSucursal();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idSucursal = Number(idParam);
      this.cargarSucursal(this.idSucursal);
    }
  }

  cargarMunicipios(): void {
    this.municipioService.listarTodos().subscribe({
      next: (data) => this.municipios = data,
      error: () => this.error = 'No se pudieron cargar los municipios.'
    });
  }

  cargarTiposSucursal(): void {
    this.catTipoSucursalService.listarTodos().subscribe({
      next: (data) => this.tiposSucursal = data,
      error: () => this.error = 'No se pudieron cargar los tipos de sucursal.'
    });
  }

  cargarSucursal(id: number): void {
    this.sucursalService.buscarPorId(id).subscribe({
      next: (data) => this.sucursal = data,
      error: () => this.error = 'No se pudo cargar la información de la sucursal.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idSucursal
      ? this.sucursalService.actualizar(this.idSucursal, this.sucursal)
      : this.sucursalService.crear(this.sucursal);

    peticion.subscribe({
      next: () => this.router.navigate(['/sucursales']),
      error: () => {
        this.error = 'Ocurrió un error al guardar la sucursal.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/sucursales']);
  }
}
