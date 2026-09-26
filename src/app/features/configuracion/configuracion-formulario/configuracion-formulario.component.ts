import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../../../core/models/configuracion.model';
import { CatMoneda } from '../../../core/models/catmoneda.model';
import { CatTipoInventario } from '../../../core/models/CatTipoinventario.model';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { CatMonedaService } from '../../../core/services/catmoneda.service';
import { CatTipoInventarioService } from '../../../core/services/cartipoinventario.service';

@Component({
  selector: 'app-configuracion-formulario',
  standalone: false,
  templateUrl: './configuracion-formulario.component.html',
  styleUrl: './configuracion-formulario.component.css'
})
export class ConfiguracionFormularioComponent implements OnInit {

  configuracion: Configuracion = {
    idMoneda: null,
    idTipoInventario: null,
    nombreEmpresa: '',
    telefono: '',
    direccion: ''
  };

  monedas: CatMoneda[] = [];
  tiposInventario: CatTipoInventario[] = [];

  cargando = false;
  guardando = false;
  error = '';
  mensajeExito = '';

  constructor(
    private configuracionService: ConfiguracionService,
    private monedaService: CatMonedaService,
    private tipoInventarioService: CatTipoInventarioService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;

    this.monedaService.listarTodos().subscribe({
      next: (data) => this.monedas = data,
      error: () => this.error = 'No se pudieron cargar las monedas'
    });

    this.tipoInventarioService.listarTodos().subscribe({
      next: (data) => this.tiposInventario = data,
      error: () => this.error = 'No se pudieron cargar los tipos de inventario'
    });

    this.configuracionService.obtener().subscribe({
      next: (data) => {
        this.configuracion = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la configuración';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';
    this.mensajeExito = '';

    this.configuracionService.actualizar(this.configuracion).subscribe({
      next: (data) => {
        this.configuracion = data;
        this.guardando = false;
        this.mensajeExito = 'Configuración guardada correctamente.';
      },
      error: (err) => {
        this.guardando = false;
        this.error = err.error?.mensaje || 'No se pudo guardar la configuración';
      }
    });
  }
}
