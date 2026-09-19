import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatMetodoPago } from '../models/catmetodopago.model';




@Injectable({
  providedIn: 'root'
})
export class CatMetodoPagoService {

  private apiUrl = `${environment.apiUrl}/cat-metodo-pago`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<CatMetodoPago[]> {
    return this.http.get<CatMetodoPago[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<CatMetodoPago> {
    return this.http.get<CatMetodoPago>(`${this.apiUrl}/${id}`);
  }

  crear(catMetodoPago: CatMetodoPago): Observable<CatMetodoPago> {
    return this.http.post<CatMetodoPago>(this.apiUrl, catMetodoPago);
  }

  actualizar(id: number, catMetodoPago: CatMetodoPago): Observable<CatMetodoPago> {
    return this.http.put<CatMetodoPago>(`${this.apiUrl}/${id}`, catMetodoPago);
  }

  desactivar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }
}

