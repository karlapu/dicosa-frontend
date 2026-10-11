import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private url = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  obtener(idSucursal: number | null, desde: string, hasta: string): Observable<Dashboard> {
    let params = new HttpParams().set('desde', desde).set('hasta', hasta);
    if (idSucursal !== null) {
      params = params.set('idSucursal', idSucursal);
    }
    return this.http.get<Dashboard>(this.url, { params });
  }
}
 