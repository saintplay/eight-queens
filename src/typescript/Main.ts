/// <reference path="Globals.ts" />
/// <reference path="Tablero.ts" />
/// <reference path="TimeController.ts" />
/// <reference path="Jugador.ts" />

namespace Application {

    let time_controller: TimeController;
    let tablero: Tablero;

    let jugador_a: Jugador;
    let jugador_b: Jugador;
    let jugador_activo: Jugador;
    let jugadores: Jugador[] = [jugador_a, jugador_b];

    class Juego {
        
        // El unico momento donde no cambiaremos el turno es al comienzo del juego
        static siguienteTurno(cambiarTurno: boolean = true) {
            if (cambiarTurno == true) {
                if (jugador_activo == jugador_a) {
                    jugador_activo = jugador_b;
                } else if (jugador_activo == jugador_b) {
                    jugador_activo = jugador_a;
                }
            }
            
            // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
            TimeController.alAcabarse = jugador_activo.llegaAlLimiteDeTiempo
                                            .bind(jugador_activo);
            jugador_activo.empezarTurno();
            time_controller.terminarContador();
            time_controller.empezarContador();
        }
    }

    $(function() {
         _$.initElements();
        
        time_controller = new TimeController();

        jugador_a = new Jugador('#human-icono');
        jugador_b = new Jugador('#robot-icono');
        jugador_b.EsIA = true;
        jugador_activo = jugador_a;

        // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
        jugador_a.alTerminar = Juego.siguienteTurno;
        jugador_b.alTerminar = Juego.siguienteTurno;

        _$.play_button.on('click', function() {
            time_controller.empezarContador();

            // Ejecutamos el siguiente turno para empezar el juego
            Juego.siguienteTurno(false);  
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

        $('td').on('click', function(){
            $(this).addClass('queen-images');
        })

    });
}
    