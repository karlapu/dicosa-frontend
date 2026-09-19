import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Municipio } from '../models/municipio.model';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private baseUrl = `${environment.apiUrl}/municipios`;

  constructor(private http: HttpClient){}

  listarTodos():Observable<Municipio[]>{
 return this.http.get<Municipio[]>(this.baseUrl);
  }
  buscarPorId(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.baseUrl}/${id}`);

  }
    listarPorDepartamento(idDepartamento: number): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.baseUrl}/departamento/${idDepartamento}`
    );
  }
 crear(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(this.baseUrl, municipio);
  }

  actualizar(id: number, municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(
      `${this.baseUrl}/${id}`,
      municipio
    );
  }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/${id}/activar`,
      {}
    );
  }
}


