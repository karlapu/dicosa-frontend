import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ConfiguracionService } from './configuracion.service';
import { CatMonedaService } from './catmoneda.service';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private simboloActual = 'Q';
  private cargado = false;
  private cargando = false;

  constructor(
    private configuracionService: ConfiguracionService,
    private catMonedaService: CatMonedaService
  ) { }

  get simbolo(): string {
    if (!this.cargado && !this.cargando && localStorage.getItem('token')) {
      this.cargar();
    }
    return this.simboloActual;
  }

  cargar(): void {
    this.cargando = true;
    forkJoin({
      configuracion: this.configuracionService.obtener(),
      monedas: this.catMonedaService.listarTodos()
    }).subscribe({
      next: ({ configuracion, monedas }) => {
        const moneda = monedas.find(m => m.idMoneda === configuracion.idMoneda);
        if (moneda && moneda.simbolo) {
          this.simboloActual = moneda.simbolo;
        }
        this.cargado = true;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}
