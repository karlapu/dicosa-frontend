import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];
  cargando = false;
  error = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.error = '';

    this.clienteService.listarTodos().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los clientes.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.router.navigate(['/clientes/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  desactivar(id: number): void {
    this.clienteService.desactivar(id).subscribe({
      next: () => this.cargarClientes(),
      error: () => this.error = 'No se pudo desactivar el cliente.'
    });
  }

  activar(id: number): void {
    this.clienteService.activar(id).subscribe({
      next: () => this.cargarClientes(),
      error: () => this.error = 'No se pudo activar el cliente.'
    });
  }
}
