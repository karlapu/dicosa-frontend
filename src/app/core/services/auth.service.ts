import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }
  login (credenciales: LoginRequest): Observable<LoginResponse> {
   return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credenciales).pipe(
       tap((respuesta) => {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('username', respuesta.username);
        localStorage.setItem('nombre', respuesta.nombre);
        localStorage.setItem('rol', respuesta.rol);

             })
    );
  }
 logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
  }

    getToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return this.getToken() !== null;
  }
 getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }
}


