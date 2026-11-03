import { Service, signal, computed } from '@angular/core';

export interface PeliculaReservada {
  id: number;
  titulo: string;
  genero: string;
  duracion: number;
  precio: number;
  disponibles: number;
  cartel: string;
  cantidad: number;
}

@Service()
export class ReservasService {

  reservas = signal<PeliculaReservada[]>([]);

  totalTitulos = computed(() => this.reservas().length);

  totalEntradas = computed(() =>
    this.reservas().reduce((suma, r) => suma + r.cantidad, 0),
  );

  anadir(pelicula: PeliculaReservada): void {
    const reserva = this.reservas().find(r => r.id === pelicula.id);

    if (reserva) {
      // ya está: le sumo 1, pero nunca más de las disponibles
      if (reserva.cantidad >= reserva.disponibles) {
        return;
      }
      this.reservas.update(reservasActuales =>
        reservasActuales.map(r =>
          r.id === pelicula.id ? { ...r, cantidad: r.cantidad + 1 } : r,
        ),
      );
      return;
    }

    if (pelicula.disponibles <= 0) {
      return;
    }

    this.reservas.update(reservasActuales => [
      ...reservasActuales,
      { ...pelicula, cantidad: 1 },
    ]);
  }

  sumarUno(id: number): void {
    this.reservas.update(reservasActuales =>
      reservasActuales.map(r =>
        r.id === id && r.cantidad < r.disponibles
          ? { ...r, cantidad: r.cantidad + 1 }
          : r,
      ),
    );
  }

  restarUno(id: number): void {
    this.reservas.update(reservasActuales =>
      reservasActuales
        .map(r => (r.id === id ? { ...r, cantidad: r.cantidad - 1 } : r))
        .filter(r => r.cantidad > 0),
    );
  }

  quitar(id: number): void {
    this.reservas.update(reservasActuales =>
      reservasActuales.filter(r => r.id !== id),
    );
  }

  vaciar(): void {
    this.reservas.set([]);
  }
}