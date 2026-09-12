import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = `${environment.apiUrl}/menus`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.baseUrl}/${id}`);
  }

  crear(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.baseUrl, menu);
  }

  actualizar(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.baseUrl}/${id}`, menu);
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}
