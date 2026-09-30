import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Compra } from '../models/comprar.model';


@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = `${environment.apiUrl}/compras`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/${id}`);
  }

  crear(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, compra);
  }
}
