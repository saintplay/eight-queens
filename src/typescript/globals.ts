import { Tablero } from "./Tablero";
import { Turno } from "./Turno";
import { AlfaBetaPruning } from "./AlfaBetaPruning";

export class _$ {
    static rollback_button: JQuery;
    static play_button: JQuery;
    static restart_button: JQuery;
    static time_counter: JQuery;
    static human_puntaje: JQuery;
    static robot_puntaje: JQuery;

    static initElements() {
        _$.rollback_button = $('#rollback-button');
        _$.play_button = $('#play-button');
        _$.restart_button = $('#restart-button');
        _$.time_counter = $('#time-counter');
        _$.human_puntaje = $('#human-box .puntaje-value');
        _$.robot_puntaje = $('#robot-box .puntaje-value');
    }
}

export class Puntajes {
    static FIN_TIEMPO: number = 0;
    static JUGADA_CORRECTA: number = +10;
    static JUGADA_INCORRECTA: number = -5;
    static USAR_ROLLBACK: number = 0;
}

export class Globales {
    static NUMERO_JUGADORES: number = 2;
    static TAMANIO_DE_TABLERO: number = 8;
    static NUMERO_INTENTOS_TURNO: number = 3;
    static readonly MAS_INFINITO: number = +1000;
    static readonly MENOS_INFINO: number = -1000;
}

export enum Utilidad {
    GanaHumano = -10,
    Empate = 0,
    GanaMaquina = +10,
}
