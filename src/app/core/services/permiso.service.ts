import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permiso } from '../models/permiso.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  private baseUrl = `${environment.apiUrl}/permisos`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Permiso> {
    return this.http.get<Permiso>(`${this.baseUrl}/${id}`);
  }

  crear(permiso: Permiso): Observable<Permiso> {
    return this.http.post<Permiso>(this.baseUrl, permiso);
  }

  actualizar(id: number, permiso: Permiso): Observable<Permiso> {
    return this.http.put<Permiso>(`${this.baseUrl}/${id}`, permiso);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}
