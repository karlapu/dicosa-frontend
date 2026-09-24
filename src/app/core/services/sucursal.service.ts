import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Sucursal } from '../models/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private baseUrl = `${environment.apiUrl}/sucursales`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.baseUrl}/${id}`);
  }

  crear(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(this.baseUrl, sucursal);
  }

  actualizar(id: number, sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this.baseUrl}/${id}`, sucursal);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}
