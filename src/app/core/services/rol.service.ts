import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.baseUrl}/${id}`);
  }

  crear(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.baseUrl, rol);
  }

  actualizar(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.baseUrl}/${id}`, rol);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}
