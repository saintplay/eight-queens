/// <reference path="Globals.ts" />
/// <reference path="AlphaBetaPruning.ts" />

namespace Application {

    export class Jugador {
        private _icono: JQuery;
        private _es_ia: boolean = false;

        public puntos: number = 0;
        public intentos_fallidos: number = 0;

        get EsIA() {
            return this._es_ia;
        }

        set EsIA(new_es_ia: boolean) {
            this._es_ia = new_es_ia;
        }

        alTerminar: Function;

        constructor(new_icon: string) {
            this._icono = $(new_icon);
        }

        empezarTurno() {
            this._icono.addClass('jugador-activo');

            if (this._es_ia) {
                let nodo: Nodo =  abp.mejorJugada(tablero, 8, Globales.MENOS_INFINO, Globales.MAS_INFINITO);
                tablero.insertarReina(nodo.casillero);
                tablero.mostrarDisponibles();
                $('td[fila='+nodo.casillero.fila+'][columna='+nodo.casillero.columna+']').addClass('queen-images');
                this.puntos += Puntajes.JUGADA_CORRECTA;
                _$.robot_puntaje.text(this.puntos);
            }
        }

        llegaAlLimiteDeTiempo() {
            this.puntos += Puntajes.FIN_TIEMPO;
            this.terminaTurno();
        }

        terminaTurno() {
            this._icono.removeClass('jugador-activo');
            this.alTerminar();
        }
    }
}