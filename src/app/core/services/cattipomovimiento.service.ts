import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatTipoMovimiento } from '../models/cattipomovimiento.model';

@Injectable({
  providedIn: 'root'
})
export class CatTipoMovimientoService {

  private apiUrl = `${environment.apiUrl}/cat-tipo-movimiento`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<CatTipoMovimiento[]> {
    return this.http.get<CatTipoMovimiento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<CatTipoMovimiento> {
    return this.http.get<CatTipoMovimiento>(`${this.apiUrl}/${id}`);
  }

  crear(catTipoMovimiento: CatTipoMovimiento): Observable<CatTipoMovimiento> {
    return this.http.post<CatTipoMovimiento>(this.apiUrl, catTipoMovimiento);
  }

  actualizar(id: number, catTipoMovimiento: CatTipoMovimiento): Observable<CatTipoMovimiento> {
    return this.http.put<CatTipoMovimiento>(`${this.apiUrl}/${id}`, catTipoMovimiento);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }
}
