/// <reference path="Globals.ts" />
/// <reference path="Turno.ts" />

namespace Application {

    export class Casillero {
        public fila: number;
        public columna: number;

        constructor(new_fila: number, new_columna: number) {
            this.fila = new_fila;
            this.columna = new_columna;
        }   
    }

    export class Tablero {
        public filas: number = Globales.TAMANIO_DE_TABLERO;
        public columnas: number = Globales.TAMANIO_DE_TABLERO;

        private _disponibles: Casillero[];
        private _insertadas: Casillero[];

        ObtenerUtilidad(): Utilidad {
            // Si hay 8 reinas colocadas
            if (this._insertadas.length == Globales.TAMANIO_DE_TABLERO)
                return Utilidad.Empate;
            
            // Si es el turno de la maquina
            if (turno.jugador_key == JugadorKey.JugadorB)
                return Utilidad.GanaMaquina;
                
            // Si es el turno del humano
            return Utilidad.GanaHumano;
        }

        esTerminal(): boolean {
            if (this._disponibles.length == 0) {
                return true;
            }

            return false;                
        }

        ObtenerDisponibles(): Casillero[] {
            return this._disponibles;
        }

        insertarReina(casillero: Casillero) {

        }
    }

    export let tablero: Tablero;
}