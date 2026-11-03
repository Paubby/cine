import { Component, computed, inject, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReservasService } from '../services/reservas-service';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-pelicula',
  styleUrl: './pelicula.css',
  templateUrl: './pelicula.html',
})
export class Pelicula {
  @Input() id: number = 0;
  @Input() titulo: string = '';
  @Input() genero: string = '';
  @Input() duracion: number = 0;
  @Input() precio: number = 0;
  @Input() disponibles: number = 0;
  @Input() cartel: string = '';

  private readonly reservas = inject(ReservasService);

  // entradas libres = disponibles - las que seleccionas como reservadas
  public libres = computed(() => {
    const reserva = this.reservas.reservas().find(r => r.id === this.id); // recorre reservas para encontrar uno que coincida con id
    const reservadas = reserva ? reserva.cantidad : 0;
    return this.disponibles - reservadas;
  });

  anadir(): void {
    this.reservas.anadir({
      id: this.id,
      titulo: this.titulo,
      genero: this.genero,
      duracion: this.duracion,
      precio: this.precio,
      disponibles: this.disponibles,
      cartel: this.cartel,
      cantidad: 1,
    });
  }
}
