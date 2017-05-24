/// <reference path="Globals.ts" />

namespace Application {
    export class TimeController {
        static $time_counter: JQuery;
        private _interval_handle: number = null;
        private _time: number;
        static readonly SEGUNDOS = 10;
        static readonly TIEMPO_FIN = -1; // Vamos a contar al cero como un segundo más
        static alAcabarse: Function;

        get time(): number {
            return this._time;
        }
        set time(new_time: number) {
            this._time = new_time;
        }

        constructor() {
            TimeController.$time_counter = $('#time-counter');     
        }

        mostrarTiempo() {
            TimeController.$time_counter.text(this._time);
        }

        descontarTiempo() {
            this._time --;
            this.mostrarTiempo();

            if (this._time == TimeController.TIEMPO_FIN)
                TimeController.alAcabarse();
        }

        empezarContador() {
            this._time = TimeController.SEGUNDOS;
            this.mostrarTiempo();
            this._interval_handle = setInterval(this.descontarTiempo.bind(this), 1e3);
        }

        terminarContador() {
            if (this._interval_handle != null)
                clearInterval(this._interval_handle);
        }

    }
}