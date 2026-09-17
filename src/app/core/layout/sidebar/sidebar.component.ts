import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';

interface SeccionMenu {
  nombreModulo: string;
  menus: Menu[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  secciones: SeccionMenu[] = [];
  cargando = true;

  nombreUsuario: string | null = '';
  rolUsuario: string | null = '';

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = this.authService.getNombre();
    this.rolUsuario = this.authService.getRol();
    this.cargarMenus();
  }

  cargarMenus(): void {
    this.cargando = true;
    this.menuService.listarTodos().subscribe({
      next: (menus) => {
        this.secciones = this.agruparPorModulo(menus);
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        console.error('No se pudieron cargar los menús del sidebar', err);
      }
    });
  }

  // Agrupa los menús ACTIVOS por el nombre de su módulo, conservando
  // el orden en que aparece cada módulo por primera vez.
  private agruparPorModulo(menus: Menu[]): SeccionMenu[] {
    const activos = menus.filter(m => m.estado === 'ACTIVO');
    const secciones: SeccionMenu[] = [];

    for (const menu of activos) {
      const nombreModulo = menu.nombreModulo ?? 'Otros';
      let seccion = secciones.find(s => s.nombreModulo === nombreModulo);

      if (!seccion) {
        seccion = { nombreModulo, menus: [] };
        secciones.push(seccion);
      }

      seccion.menus.push(menu);
    }

    return secciones;
  }

  inicialUsuario(): string {
    return this.nombreUsuario ? this.nombreUsuario.charAt(0).toUpperCase() : '?';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
 
