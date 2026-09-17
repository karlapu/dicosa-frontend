
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Departamento } from '../models/departamento';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

private baseUrl = `${environment.apiUrl}/departamentos`;

constructor(private http: HttpClient){ }

listarTodos(): Observable<Departamento[]> {
  return this.http.get<Departamento[]>(this.baseUrl);

}

buscarPorId(id: number): Observable<Departamento> {
  return this.http.get<Departamento>(`${this.baseUrl}/${id}`);


}

crear(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.baseUrl, departamento);
}

  actualizar(id: number, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.baseUrl}/${id}`, departamento);
  }
 desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activar`, {});
  }
}

