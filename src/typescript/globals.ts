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
}