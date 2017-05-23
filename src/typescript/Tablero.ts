/// <reference path="Globals.ts" />

namespace Application {

    export enum Turno {
        JugadorA = 0,
        JugadorB
    }

    export class Tablero {
        public filas: number = 8;
        public columnas: number = 8;
        public turno: Turno;
    }
}