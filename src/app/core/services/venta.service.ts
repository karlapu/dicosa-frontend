import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  crear(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }
}
