/// <reference path="typings.d.ts" />

import { _$, Globales, Puntajes } from "./Globals";
import { Turno, JugadorKey } from "./Turno";
import { Tablero, Casillero } from "./Tablero";
import { AlfaBetaPruning } from "./AlfaBetaPruning";
import { Jugador } from "./Jugador";
import { TimeController } from "./TimeController";

let time_controller: TimeController;    
let jugador_a: Jugador;
let jugador_b: Jugador;
let jugadores: Jugador[];

interface Window { turno: Turno; abp: AlfaBetaPruning; tablero: Tablero; }
declare var window: Window;

class Juego {
    
    // El unico momento donde no cambiaremos el turno es al comienzo del juego
    static siguienteTurno(cambiarTurno: boolean = true) {
        if (cambiarTurno == true) {
            window.turno.cambiar();
        }
        let jugador_actual: Jugador = jugadores[window.turno.jugador_key];
        
        // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
        TimeController.alAcabarse = jugador_actual.llegaAlLimiteDeTiempo
                                    .bind(jugador_actual);
        
        time_controller.terminarContador();
        time_controller.empezarContador();
        jugador_actual.empezarTurno();
    }

    static DetenerJuego() {
        time_controller.terminarContador();
    }

    static PierdeHumano() {
        alert('Perdiste!!');
        Juego.DetenerJuego();
    }

    static GanaHumano() {
        alert('Has Ganado!!');
        Juego.DetenerJuego();
    }
    
    static TerminarTurnoDeRobot() {
        if (window.tablero.esTerminal()) {
            Juego.PierdeHumano();
        }
        else {
            Juego.siguienteTurno();
        }
    }
}


$(function() {
    _$.initElements();
    
    time_controller = new TimeController();
    window.turno = new Turno();
    window.abp = new AlfaBetaPruning();

    window.tablero = new Tablero();
    window.tablero.inicializarDisponibles();
    window.tablero.mostrar_disponibles = false;
    
    jugador_a = new Jugador('#human-icono');
    jugador_b = new Jugador('#robot-icono');
    jugadores = [jugador_a, jugador_b];
    jugador_b.EsIA = true;

    // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
    jugador_a.alTerminar = Juego.siguienteTurno;
    jugador_b.alTerminar = Juego.TerminarTurnoDeRobot;

    _$.play_button.on('click', function() {
        time_controller.empezarContador();
        window.turno.jugador_key = Math.floor(Math.random() * Globales.NUMERO_JUGADORES);

        if (window.turno.jugador_key == JugadorKey.JugadorB) {
            window.tablero.insertarReina(new Casillero( Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)));
            Juego.siguienteTurno();
        }
        else {
            // Ejecutamos el siguiente turno para empezar el juego
            Juego.siguienteTurno(false);
        }
            
    });

    _$.rollback_button.on('click', function() {
        _$.rollback_button.hide();
        $('#human-box .rb-status').addClass('rb-used');
    });

    _$.restart_button.on('click', function() {
        _$.rollback_button.hide();
        $('td').removeClass("queen-images");
        $('#human-box .rb-status').removeClass('rb-used');
        _$.rollback_button.show();
    });

     _$.ayuda_button.on('click', function() {
        window.tablero.mostrar_disponibles = true;
    });

     _$.noayuda_button.on('click', function() {
        window.tablero.mostrar_disponibles = false;
    });

    $('#chess-table').on('click', 'td', function() {
        let fila: number =  parseInt($(this).attr('fila'));
        let columna: number =  parseInt($(this).attr('columna'));
        let casillero: Casillero = new Casillero(fila, columna);

        if (window.tablero.reinaEsValidaEn(casillero)) {
            $(this).addClass('queen-images');
            window.tablero.insertarReina(casillero);
            window.tablero.mostrarDisponibles();
            jugador_a.puntos += Puntajes.JUGADA_CORRECTA;
            jugador_a.intentos_fallidos = 0;

            if (window.tablero.esTerminal() == false) {
                jugador_a.terminaTurno();
            }
            else {
                Juego.GanaHumano();
            }
        }
        else {
            jugador_a.puntos += Puntajes.JUGADA_INCORRECTA;

            if (jugador_a.intentos_fallidos + 1 == Globales.NUMERO_INTENTOS_TURNO) {
                Juego.PierdeHumano();
            }
            else {
                jugador_a.intentos_fallidos += 1;
            }
        }
        
        _$.human_puntaje.text(jugador_a.puntos);
        
    })

});
