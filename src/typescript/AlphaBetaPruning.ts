/// <reference path="Tablero.ts" />

namespace Application {

    class Nodo {
        public puntaje: number;
        constructor(new_puntaje: number) {

        }
    }

    export class AlphaBetaPrunning {

        mejorJugada(tablero: Tablero, profundidad: number, alpha: number, beta: number): Nodo {
            let puntaje = tablero.ObtenerPuntaje();

            if (tablero.finalizoJuego(profundidad, puntaje)) {
                return new Nodo(puntaje);
            }
        }

    }

    export let abp: AlphaBetaPrunning;
}