import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modulo } from '../models/modulo.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private baseUrl = `${environment.apiUrl}/modulos`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Modulo> {
    return this.http.get<Modulo>(`${this.baseUrl}/${id}`);
  }

  crear(modulo: Modulo): Observable<Modulo> {
    return this.http.post<Modulo>(this.baseUrl, modulo);
  }

  actualizar(id: number, modulo: Modulo): Observable<Modulo> {
    return this.http.put<Modulo>(`${this.baseUrl}/${id}`, modulo);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}
