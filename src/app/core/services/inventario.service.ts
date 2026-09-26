import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Inventario } from '../models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private baseUrl = `${environment.apiUrl}/inventario`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.baseUrl}/${id}`);
  }

  crear(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.baseUrl, inventario);
  }

  actualizar(id: number, inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.baseUrl}/${id}`, inventario);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}
