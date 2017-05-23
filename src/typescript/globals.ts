namespace Application {

    export class _$ {
        static rollback_button: JQuery;
        static play_button: JQuery;
        static restart_button: JQuery;
        static time_counter: JQuery;

        static initElements() {
            _$.rollback_button = $('#rollback-button');
            _$.play_button = $('#play-button');
            _$.restart_button = $('#restart-button');
            _$.time_counter = $('#time-counter');
        }
    }

    export class Puntajes {
        static FIN_TIEMPO: number = -5;
        static JUGADA_CORRECTA: number = 10;
        static JUGADA_INCORRECTA: number = -5;
        static USAR_ROLLBACK: number = 0;
    }

    export class Globales {
        static NUMERO_JUGADORES: number = 2;
    }
}