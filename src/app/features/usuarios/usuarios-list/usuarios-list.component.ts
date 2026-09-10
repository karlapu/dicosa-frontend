import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  standalone: false,
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})

export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando = true;
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  irANuevo(): void {
    this.router.navigate(['/usuarios/nuevo']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  desactivar(id: number): void {
    this.usuarioService.desactivar(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'No se pudo desactivar el usuario.'
    });
  }

  activar(id: number): void {
    this.usuarioService.activar(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'No se pudo activar el usuario.'
    });
  }
}
