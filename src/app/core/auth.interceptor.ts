import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const esRutaLogin = req.url.includes('/auth/login');

  const reqFinal = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(reqFinal).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 401 || error.status === 403) && !esRutaLogin && token) {
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { sesionExpirada: 'true' }
        });
      }
      return throwError(() => error);
    })
  );
};
 