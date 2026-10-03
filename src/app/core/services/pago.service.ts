import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pago, SaldoVenta } from '../models/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  obtenerSaldo(idVenta: number): Observable<SaldoVenta> {
    return this.http.get<SaldoVenta>(`${this.apiUrl}/venta/${idVenta}/saldo`);
  }

  crear(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }
}
