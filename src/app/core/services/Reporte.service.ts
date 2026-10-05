import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuadreCaja } from '../models/cuadrecaja.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReporteService {

  private urlBase = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) { }

  obtenerCuadreCaja(fecha: string): Observable<CuadreCaja> {
    return this.http.get<CuadreCaja>(`${this.urlBase}/cuadre-caja?fecha=${fecha}`);
  }
}
