/// <reference path="Tablero.ts" />

namespace Application {

    export class Nodo {
        public utilidad: number;
        public casillero: Casillero;

        constructor (new_utilidad: number) {
            this.utilidad = new_utilidad;
        }
    }

    export class AlfaBetaPruning {

        mejorJugada(tablero: Tablero, profundidad: number, alfa: number, beta: number): Nodo {

            if (tablero.esTerminal()) {
                let utilidad_tablero: number = tablero.ObtenerUtilidad();
                return new Nodo(utilidad_tablero);
            }

            let valor: Nodo = new Nodo(Globales.MENOS_INFINO);

            for (let disponible of tablero.ObtenerDisponibles()) {
                //let tablero_copia: Tablero = (<any>Object).assign({}, tablero);
                let tablero_copia: Tablero = tablero.hacerCopia();
                tablero_copia.insertarReina(disponible);

                let minimo_abajo = this.peorJugada(tablero_copia, profundidad - 1, alfa, beta)

                valor.utilidad = Math.max(valor.utilidad, minimo_abajo.utilidad);
                valor.casillero = disponible;
                
                if (valor.utilidad >= beta) {
                    return valor;
                }

                beta =  Math.max(beta, valor.utilidad);
            }

            return valor;
        }

        peorJugada(tablero: Tablero, profundidad: number, alfa: number, beta: number): Nodo {

            if (tablero.esTerminal()) {
                let utilidad_tablero: number = tablero.ObtenerUtilidad();
                return new Nodo(utilidad_tablero);
            }

            let valor: Nodo = new Nodo(Globales.MAS_INFINITO);

            for (let disponible of tablero.ObtenerDisponibles()) {
                //let tablero_copia: Tablero = (<any>Object).assign({}, tablero);
                let tablero_copia: Tablero = $.extend(true, {}, tablero);
                tablero_copia.insertarReina(disponible);

                let maximo_abajo: Nodo = this.mejorJugada(tablero_copia, profundidad - 1, alfa, beta)

                valor.utilidad = Math.min(valor.utilidad, maximo_abajo.utilidad);
                valor.casillero = disponible;

                if (valor.utilidad <= alfa) {
                    return valor;
                }

                beta =  Math.min(beta, valor.utilidad);
            }

            return valor;
        }

    }

    export let abp: AlfaBetaPruning;
}