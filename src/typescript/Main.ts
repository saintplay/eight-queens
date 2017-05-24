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
            console.log(turno.jugador_key);
            let jugador_actual = jugadores[turno.jugador_key];
            console.log(jugadores);
            // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
            TimeController.alAcabarse = jugador_actual.llegaAlLimiteDeTiempo
                                        .bind(jugador_actual);

            jugador_actual.empezarTurno();
            time_controller.terminarContador();
            time_controller.empezarContador();
        }
    }

    $(function() {
         _$.initElements();
        
        time_controller = new TimeController();
        turno = new Turno();
        abp = new AlfaBetaPruning();
        
        jugador_a = new Jugador('#human-icono');
        jugador_b = new Jugador('#robot-icono');
        jugadores = [jugador_a, jugador_b];

        jugador_b.EsIA = true;
        turno.jugador_key = JugadorKey.JugadorA;

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
    