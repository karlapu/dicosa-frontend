import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'dicosa-frontend';
  esRutaLogin = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Revisamos la ruta actual apenas arranca la app (por si recargan estando en /login)
    this.esRutaLogin = this.router.url.startsWith('/login');

    // Y nos suscribimos para actualizarlo cada vez que el usuario navega
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.esRutaLogin = this.router.url.startsWith('/login');
      });
  }


  
}
