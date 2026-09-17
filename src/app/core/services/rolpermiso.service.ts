import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolPermiso } from '../models/rolpermiso.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolPermisoService {

  private baseUrl = `${environment.apiUrl}/rol-permiso`;

  constructor(private http: HttpClient) { }

  listarPorRol(idRol: number): Observable<RolPermiso[]> {
    return this.http.get<RolPermiso[]>(`${this.baseUrl}/rol/${idRol}`);
  }

  asignar(idRol: number, idPermiso: number): Observable<RolPermiso> {
    const params = new HttpParams().set('idRol', idRol).set('idPermiso', idPermiso);
    return this.http.post<RolPermiso>(this.baseUrl, {}, { params });
  }

  quitar(idRol: number, idPermiso: number): Observable<void> {
    const params = new HttpParams().set('idRol', idRol).set('idPermiso', idPermiso);
    return this.http.delete<void>(this.baseUrl, { params });
  }
}
 