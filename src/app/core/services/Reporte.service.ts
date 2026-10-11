import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuadreCaja } from '../models/cuadrecaja.model';
import { environment } from '../../../environments/environment';
import { MovimientosReporte } from '../models/movimientosreporte.model';
import { Conciliacion } from '../models/conciliacion.mode';

@Injectable({ providedIn: 'root' })
export class ReporteService {

  private urlBase = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) { }

  obtenerCuadreCaja(fecha: string): Observable<CuadreCaja> {
    return this.http.get<CuadreCaja>(`${this.urlBase}/cuadre-caja?fecha=${fecha}`);
  }

   obtenerMovimientos(desde: string, hasta: string, idSucursal: number | null): Observable<MovimientosReporte> {
    let url = `${this.urlBase}/movimientos?desde=${desde}&hasta=${hasta}`;
    if (idSucursal !== null) {
      url += `&idSucursal=${idSucursal}`;
    }
    return this.http.get<MovimientosReporte>(url);
  }

    obtenerConciliacion(idSucursal: number | null): Observable<Conciliacion> {
    let url = `${this.urlBase}/conciliacion`;
    if (idSucursal !== null) {
      url += `?idSucursal=${idSucursal}`;
    }
    return this.http.get<Conciliacion>(url);
  }
}
