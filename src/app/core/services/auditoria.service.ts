import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auditoria } from '../models/auditoria.model';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private apiUrl = `${environment.apiUrl}/auditoria`;

  constructor(private http: HttpClient) { }

  listar(filtros?: { tabla?: string; idUsuario?: number; desde?: string; hasta?: string }): Observable<Auditoria[]> {
    let params = new HttpParams();

    if (filtros?.tabla) {
      params = params.set('tabla', filtros.tabla);
    }
    if (filtros?.idUsuario) {
      params = params.set('idUsuario', filtros.idUsuario);
    }
    if (filtros?.desde) {
      params = params.set('desde', filtros.desde);
    }
    if (filtros?.hasta) {
      params = params.set('hasta', filtros.hasta);
    }

    return this.http.get<Auditoria[]>(this.apiUrl, { params });
  }
}
