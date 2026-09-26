import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatTipoInventario } from '../models/CatTipoinventario.model';


@Injectable({
  providedIn: 'root'
})
export class CatTipoInventarioService {

  private apiUrl = `${environment.apiUrl}/cat-tipo-inventario`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<CatTipoInventario[]> {
    return this.http.get<CatTipoInventario[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<CatTipoInventario> {
    return this.http.get<CatTipoInventario>(`${this.apiUrl}/${id}`);
  }

  crear(tipo: CatTipoInventario): Observable<CatTipoInventario> {
    return this.http.post<CatTipoInventario>(this.apiUrl, tipo);
  }

  actualizar(id: number, tipo: CatTipoInventario): Observable<CatTipoInventario> {
    return this.http.put<CatTipoInventario>(`${this.apiUrl}/${id}`, tipo);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }
}
