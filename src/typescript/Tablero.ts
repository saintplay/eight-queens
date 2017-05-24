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
        public disponibles: Casillero[] = [];
        public insertadas: Casillero[] = [];

        ObtenerUtilidad(): Utilidad {
            // Si hay 8 reinas colocadas
            if (this.insertadas.length == Globales.TAMANIO_DE_TABLERO)
                return Utilidad.Empate;
            
            // Si es el turno de la maquina
            if (turno.jugador_key == JugadorKey.JugadorB)
                return Utilidad.GanaMaquina;
                
            // Si es el turno del humano
            return Utilidad.GanaHumano;
        }

        esTerminal(): boolean {
            if (this.disponibles.length == 0) {
                return true;
            }

            return false;                
        }

        ObtenerDisponibles(): Casillero[] {
            return this.disponibles;
        }

        insertarReina(casillero: Casillero) {
            for (let i = 0; i < this.disponibles.length; i++) {

                if (this.disponibles[i].columna == casillero.columna) {
                    this.disponibles.splice(i, 1);
                    i--;
                    continue;
                }
                
                if (this.disponibles[i].fila == casillero.fila) {
                    this.disponibles.splice(i, 1);
                    i--;
                    continue;
                }

                if (Math.abs(this.disponibles[i].fila - casillero.fila) == Math.abs(this.disponibles[i].columna - casillero.columna)) {
                    this.disponibles.splice(i, 1);
                    i--;
                    continue;
                }
            }

            this.insertadas.push(casillero);
        }

        inicializarDisponibles() {
            this.disponibles = [];

            for (let f = 0; f < this.filas; f++) {
                for (let c = 0; c < this.columnas; c++) {
                    this.disponibles.push(new Casillero(f, c));
                }
            }
        }

        hacerCopia(): Tablero {
            let tablero_copia: Tablero = new Tablero();
            
            tablero_copia.filas = this.filas;
            tablero_copia.columnas = this.columnas;

            tablero_copia.disponibles = [];
            tablero_copia.insertadas = [];
    
            for (let disponible of this.disponibles) {
                tablero_copia.disponibles.push(new Casillero(disponible.fila, disponible.columna));
            }

            for (let insertada of this.insertadas) {
                tablero_copia.insertadas.push(new Casillero(insertada.fila, insertada.columna));
            }

            return tablero_copia;
        }
    }

    export let tablero: Tablero;
}