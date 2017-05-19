/// <reference path="globals.ts" />

namespace Application {
    export class Jugador {
        private _puntos: number;
        static readonly PUNTOS_DESC_TIEMPO = 5;
        private _icono: JQuery;

        get Puntos() {
            return this._puntos;
        }
        set Puntos(new_puntos: number) {
            this._puntos = new_puntos;
        }

        alTerminar: Function;

        constructor(new_icon: string) {
            this._puntos = 0;
            this._icono = $(new_icon);
        }

        empezarTurno() {
            this._icono.addClass('jugador-activo');
        }

        llegaAlLimiteDeTiempo() {
            this._puntos -= Jugador.PUNTOS_DESC_TIEMPO;
            this.terminaTurno();
        }

        terminaTurno() {
            this._icono.removeClass('jugador-activo');
            this.alTerminar();
        }
    }
}