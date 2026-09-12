import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/login.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  credenciales: LoginRequest = { username: '', password: '' };
  cargando = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  iniciarSesion(): void {
    this.cargando = true;
    this.error = '';

    this.authService.login(this.credenciales).subscribe({
      next: () => {
        this.router.navigate(['/roles']);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos.';
        this.cargando = false;
      }
    });
  }
}

