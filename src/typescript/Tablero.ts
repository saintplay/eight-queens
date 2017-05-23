/// <reference path="Globals.ts" />

namespace Application {

    export class Tablero {
        public filas: number = 8;
        public columnas: number = 8;

        ObtenerPuntaje(): number {
            let puntaje: number = 0;
            return puntaje;
        }

        finalizoJuego(profundidad: number, puntaje: number): boolean {
            return false;
        }
    }
}