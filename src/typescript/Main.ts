/// <reference path="globals.ts" />
/// <reference path="Jugador.ts" />
/// <reference path="TimeController.ts" />

namespace Application {

    let time_controller: TimeController;
    let jugador_a: Jugador;
    let jugador_b: Jugador;
    let jugador_activo: Jugador;

    function cambiarDeTurno() {
        if (jugador_activo == jugador_a) {
            jugador_activo = jugador_b;
        } else if (jugador_activo == jugador_b) {
            jugador_activo = jugador_a;
        }

        jugador_activo.empezarTurno();
        TimeController.alAcabarse = jugador_activo.llegaAlLimiteDeTiempo.bind(jugador_activo);
        time_controller.terminarContador();
        time_controller.empezarContador();
    }

    $(function() {
        jugador_a = new Jugador('#human-icono');
        jugador_b = new Jugador('#robot-icono');
        jugador_activo = jugador_a;
        jugador_activo.empezarTurno();        

        jugador_a.alTerminar = cambiarDeTurno;
        jugador_b.alTerminar = cambiarDeTurno;

        time_controller = new TimeController();
        TimeController.alAcabarse = jugador_activo.llegaAlLimiteDeTiempo.bind(jugador_activo);

         _$.initElements();
        
        _$.play_button.on('click', function() {
            time_controller.empezarContador();
        });

        _$.rollback_button.on('click', function() {
            _$.rollback_button.hide();
        });

        _$.restart_button.on('click', function() {
            _$.rollback_button.hide();
            $('td').removeClass("queen-images");
            _$.rollback_button.show();
        });

        $('td').on('click', function(){
            $(this).addClass('queen-images');
        })

    });
}
    