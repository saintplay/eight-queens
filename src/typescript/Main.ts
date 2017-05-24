/// <reference path="Globals.ts" />
/// <reference path="Turno.ts" />
/// <reference path="Tablero.ts" />
/// <reference path="AlphaBetaPruning.ts" />
/// <reference path="Jugador.ts" />
/// <reference path="TimeController.ts" />

namespace Application {

    let time_controller: TimeController;    
    let jugador_a: Jugador;
    let jugador_b: Jugador;
    let jugadores: Jugador[];

    class Juego {
        
        // El unico momento donde no cambiaremos el turno es al comienzo del juego
        static siguienteTurno(cambiarTurno: boolean = true) {
            if (cambiarTurno == true) {
                turno.cambiar();
            }
            let jugador_actual: Jugador = jugadores[turno.jugador_key];
            
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
            if (tablero.esTerminal) {
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
        turno = new Turno();
        abp = new AlfaBetaPruning();

        tablero = new Tablero();
        tablero.inicializarDisponibles();
        
        jugador_a = new Jugador('#human-icono');
        jugador_b = new Jugador('#robot-icono');
        jugadores = [jugador_a, jugador_b];
        jugador_b.EsIA = true;

        // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
        jugador_a.alTerminar = Juego.siguienteTurno;
        jugador_b.alTerminar = Juego.TerminarTurnoDeRobot;

        _$.play_button.on('click', function() {
            time_controller.empezarContador();
            turno.jugador_key = Math.floor(Math.random() * Globales.NUMERO_JUGADORES);

            if (turno.jugador_key == JugadorKey.JugadorB) {
                tablero.insertarReina(new Casillero( Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)));
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

        $('td').on('click', function() {
            let fila: number =  parseInt($(this).attr('fila'));
            let columna: number =  parseInt($(this).attr('columna'));
            let casillero: Casillero = new Casillero(fila, columna);

            if (tablero.reinaEsValidaEn(casillero)) {
                $(this).addClass('queen-images');
                tablero.insertarReina(casillero);
                tablero.mostrarDisponibles();
                jugador_a.puntos += Puntajes.JUGADA_CORRECTA;
                jugador_a.intentos_fallidos = 0;

                if (tablero.esTerminal() == false) {
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
}
    