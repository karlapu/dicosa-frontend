import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { MovimientoInventario } from '../models/movimientoinventario.model';


@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {

  private baseUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<MovimientoInventario> {
    return this.http.get<MovimientoInventario>(`${this.baseUrl}/${id}`);
  }

  registrar(movimiento: MovimientoInventario): Observable<MovimientoInventario> {
    return this.http.post<MovimientoInventario>(this.baseUrl, movimiento);
  }
}
