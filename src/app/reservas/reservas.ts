import { Component, inject, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReservasService } from '../services/reservas-service';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-reservas',
  styleUrl: './reservas.css',
  templateUrl: './reservas.html',
})
export class Reservas {
  protected readonly reservasService = inject(ReservasService);

  readonly volver = output<void>();

  sumarUno(id: number): void {
    this.reservasService.sumarUno(id);
  }

  restarUno(id: number): void {
    this.reservasService.restarUno(id);
  }

  quitar(id: number): void {
    this.reservasService.quitar(id);
  }

  vaciar(): void {
    this.reservasService.vaciar();
  }
}