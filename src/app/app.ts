import { Component, computed, inject, signal } from '@angular/core';
import { Pelicula } from './pelicula/pelicula';
import { Reservas } from './reservas/reservas';
import { ReservasService } from './services/reservas-service';

@Component({
  imports: [Pelicula, Reservas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly reservasService = inject(ReservasService);
  protected readonly totalReservas = this.reservasService.totalEntradas;

  protected readonly viendoReservas = signal(false);

  protected readonly peliculas = [
    {
      id: 1,
      titulo: 'Origen',
      genero: 'Ciencia ficción',
      duracion: 148,
      precio: 6.5,
      disponibles: 12,
      cartel: '/assets/img/Origen.webp',
    },
    {
      id: 2,
      titulo: 'Parásitos',
      genero: 'Drama',
      duracion: 132,
      precio: 7.0,
      disponibles: 5,
      cartel: '/assets/img/Parasitos.jpg',
    },
    {
      id: 3,
      titulo: 'El rey león',
      genero: 'Animación',
      duracion: 88,
      precio: 5.0,
      disponibles: 0,
      cartel: '/assets/img/ElReyLeon.jpg',
    },
    {
      id: 4,
      titulo: 'Dune',
      genero: 'Aventura',
      duracion: 155,
      precio: 6.5,
      disponibles: 8,
      cartel: '/assets/img/Dune.jpg',
    },
    {
      id: 5,
      titulo: 'Batman',
      genero: 'Acción',
      duracion: 176,
      precio: 7.5,
      disponibles: 0,
      cartel: '/assets/img/Batman.jpg',
    },
    {
      id: 6,
      titulo: 'Coco',
      genero: 'Animación',
      duracion: 105,
      precio: 5.5,
      disponibles: 20,
      cartel: '/assets/img/coco.jpeg',
    },
  ];

  protected readonly textoBuscado = signal('');

  protected readonly peliculasFiltradas = computed(() => {
    const texto = normalizar(this.textoBuscado()); // normalizar par que no haya ni mayusculas ni acentos

    if (texto === '') {
      return this.peliculas; // devolverlas todas
    }

    return this.peliculas.filter(p => normalizar(p.titulo).includes(texto));
  });

  buscar(event: Event): void {
    this.textoBuscado.set((event.target as HTMLInputElement).value);
  }

  verReservas(): void {
    this.viendoReservas.set(true);
  }

  volverACartelera(): void {
    this.viendoReservas.set(false);
  }
}

/* Quita mayusculas y acentos para que "parasitos" encuentre "Parasitos". */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}
