import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatMoneda } from '../models/catmoneda.model';

@Injectable({
  providedIn: 'root'
})
export class CatMonedaService {

  private apiUrl = `${environment.apiUrl}/cat-moneda`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<CatMoneda[]> {
    return this.http.get<CatMoneda[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<CatMoneda> {
    return this.http.get<CatMoneda>(`${this.apiUrl}/${id}`);
  }

  crear(catMoneda: CatMoneda): Observable<CatMoneda> {
    return this.http.post<CatMoneda>(this.apiUrl, catMoneda);
  }

  actualizar(id: number, catMoneda: CatMoneda): Observable<CatMoneda> {
    return this.http.put<CatMoneda>(`${this.apiUrl}/${id}`, catMoneda);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }
}
