import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatTipoSucursal } from '../models/cattiposucursal.model';

@Injectable({
  providedIn: 'root'
})
export class CatTipoSucursalService {

  private apiUrl = `${environment.apiUrl}/cat-tipo-sucursal`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<CatTipoSucursal[]> {
    return this.http.get<CatTipoSucursal[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<CatTipoSucursal> {
    return this.http.get<CatTipoSucursal>(`${this.apiUrl}/${id}`);
  }

  crear(catTipoSucursal: CatTipoSucursal): Observable<CatTipoSucursal> {
    return this.http.post<CatTipoSucursal>(this.apiUrl, catTipoSucursal);
  }

  actualizar(id: number, catTipoSucursal: CatTipoSucursal): Observable<CatTipoSucursal> {
    return this.http.put<CatTipoSucursal>(`${this.apiUrl}/${id}`, catTipoSucursal);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }
}
