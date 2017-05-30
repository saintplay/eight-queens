/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _$ = (function () {
    function _$() {
    }
    _$.initElements = function () {
        _$.rollback_button = $('#rollback-button');
        _$.play_button = $('#play-button');
        _$.restart_button = $('#restart-button');
        _$.time_counter = $('#time-counter');
        _$.human_puntaje = $('#human-box .puntaje-value');
        _$.robot_puntaje = $('#robot-box .puntaje-value');
    };
    return _$;
}());
exports._$ = _$;
var Puntajes = (function () {
    function Puntajes() {
    }
    return Puntajes;
}());
Puntajes.FIN_TIEMPO = 0;
Puntajes.JUGADA_CORRECTA = +10;
Puntajes.JUGADA_INCORRECTA = -5;
Puntajes.USAR_ROLLBACK = 0;
exports.Puntajes = Puntajes;
var Globales = (function () {
    function Globales() {
    }
    return Globales;
}());
Globales.NUMERO_JUGADORES = 2;
Globales.TAMANIO_DE_TABLERO = 8;
Globales.NUMERO_INTENTOS_TURNO = 3;
Globales.MAS_INFINITO = +1000;
Globales.MENOS_INFINO = -1000;
exports.Globales = Globales;
var Utilidad;
(function (Utilidad) {
    Utilidad[Utilidad["GanaHumano"] = -10] = "GanaHumano";
    Utilidad[Utilidad["Empate"] = 0] = "Empate";
    Utilidad[Utilidad["GanaMaquina"] = 10] = "GanaMaquina";
})(Utilidad = exports.Utilidad || (exports.Utilidad = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = __webpack_require__(0);
var JugadorKey;
(function (JugadorKey) {
    JugadorKey[JugadorKey["JugadorA"] = 0] = "JugadorA";
    JugadorKey[JugadorKey["JugadorB"] = 1] = "JugadorB";
})(JugadorKey = exports.JugadorKey || (exports.JugadorKey = {}));
var Turno = (function () {
    function Turno() {
        this._jugador_actual_key = JugadorKey.JugadorA;
    }
    Object.defineProperty(Turno.prototype, "jugador_key", {
        get: function () {
            return this._jugador_actual_key;
        },
        set: function (new_key) {
            this._jugador_actual_key = new_key;
        },
        enumerable: true,
        configurable: true
    });
    Turno.prototype.cambiar = function () {
        if (this._jugador_actual_key + 1 == Globals_1.Globales.NUMERO_JUGADORES) {
            this._jugador_actual_key;
        }
        else {
            this._jugador_actual_key++;
        }
    };
    return Turno;
}());
exports.Turno = Turno;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = __webpack_require__(0);
var Nodo = (function () {
    function Nodo(new_utilidad) {
        this.utilidad = new_utilidad;
    }
    return Nodo;
}());
exports.Nodo = Nodo;
var AlfaBetaPruning = (function () {
    function AlfaBetaPruning() {
    }
    AlfaBetaPruning.prototype.mejorJugada = function (tablero, profundidad, alfa, beta) {
        if (tablero.esTerminal()) {
            var utilidad_tablero = tablero.ObtenerUtilidad();
            return new Nodo(utilidad_tablero);
        }
        var valor = new Nodo(Globals_1.Globales.MENOS_INFINO);
        for (var _i = 0, _a = tablero.ObtenerDisponibles(); _i < _a.length; _i++) {
            var disponible = _a[_i];
            var tablero_copia = tablero.hacerCopia();
            tablero_copia.insertarReina(disponible);
            var minimo_abajo = this.peorJugada(tablero_copia, profundidad - 1, alfa, beta);
            valor.utilidad = Math.max(valor.utilidad, minimo_abajo.utilidad);
            valor.casillero = disponible;
            if (valor.utilidad >= beta) {
                return valor;
            }
            beta = Math.max(beta, valor.utilidad);
        }
        return valor;
    };
    AlfaBetaPruning.prototype.peorJugada = function (tablero, profundidad, alfa, beta) {
        if (tablero.esTerminal()) {
            var utilidad_tablero = tablero.ObtenerUtilidad();
            return new Nodo(utilidad_tablero);
        }
        var valor = new Nodo(Globals_1.Globales.MAS_INFINITO);
        for (var _i = 0, _a = tablero.ObtenerDisponibles(); _i < _a.length; _i++) {
            var disponible = _a[_i];
            //let tablero_copia: Tablero = (<any>Object).assign({}, tablero);
            var tablero_copia = $.extend(true, {}, tablero);
            tablero_copia.insertarReina(disponible);
            var maximo_abajo = this.mejorJugada(tablero_copia, profundidad - 1, alfa, beta);
            valor.utilidad = Math.min(valor.utilidad, maximo_abajo.utilidad);
            valor.casillero = disponible;
            if (valor.utilidad <= alfa) {
                return valor;
            }
            beta = Math.min(beta, valor.utilidad);
        }
        return valor;
    };
    return AlfaBetaPruning;
}());
exports.AlfaBetaPruning = AlfaBetaPruning;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = __webpack_require__(0);
var Jugador = (function () {
    function Jugador(new_icon) {
        this._es_ia = false;
        this.puntos = 0;
        this.intentos_fallidos = 0;
        this._icono = $(new_icon);
    }
    Object.defineProperty(Jugador.prototype, "EsIA", {
        get: function () {
            return this._es_ia;
        },
        set: function (new_es_ia) {
            this._es_ia = new_es_ia;
        },
        enumerable: true,
        configurable: true
    });
    Jugador.prototype.empezarTurno = function () {
        this._icono.addClass('jugador-activo');
        if (this._es_ia) {
            var nodo = window.abp.mejorJugada(window.tablero, 8, Globals_1.Globales.MENOS_INFINO, Globals_1.Globales.MAS_INFINITO);
            window.tablero.insertarReina(nodo.casillero);
            window.tablero.mostrarDisponibles();
            $('td[fila=' + nodo.casillero.fila + '][columna=' + nodo.casillero.columna + ']').addClass('queen-images');
            this.puntos += Globals_1.Puntajes.JUGADA_CORRECTA;
            Globals_1._$.robot_puntaje.text(this.puntos);
        }
    };
    Jugador.prototype.llegaAlLimiteDeTiempo = function () {
        this.puntos += Globals_1.Puntajes.FIN_TIEMPO;
        this.terminaTurno();
    };
    Jugador.prototype.terminaTurno = function () {
        this._icono.removeClass('jugador-activo');
        this.alTerminar();
    };
    return Jugador;
}());
exports.Jugador = Jugador;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = __webpack_require__(0);
var Turno_1 = __webpack_require__(1);
var Casillero = (function () {
    function Casillero(new_fila, new_columna) {
        this.fila = new_fila;
        this.columna = new_columna;
    }
    return Casillero;
}());
exports.Casillero = Casillero;
var Tablero = (function () {
    function Tablero() {
        this.filas = Globals_1.Globales.TAMANIO_DE_TABLERO;
        this.columnas = Globals_1.Globales.TAMANIO_DE_TABLERO;
        this.disponibles = [];
        this.insertadas = [];
    }
    Tablero.prototype.ObtenerUtilidad = function () {
        // Si hay 8 reinas colocadas
        if (this.insertadas.length == Globals_1.Globales.TAMANIO_DE_TABLERO)
            return Globals_1.Utilidad.Empate;
        // Si es el turno de la maquina
        if (window.turno.jugador_key == Turno_1.JugadorKey.JugadorB)
            return Globals_1.Utilidad.GanaMaquina;
        // Si es el turno del humano
        return Globals_1.Utilidad.GanaHumano;
    };
    Tablero.prototype.esTerminal = function () {
        if (this.disponibles.length == 0) {
            return true;
        }
        return false;
    };
    Tablero.prototype.ObtenerDisponibles = function () {
        return this.disponibles;
    };
    Tablero.prototype.reinaEsValidaEn = function (casillero) {
        for (var i = 0; i < this.insertadas.length; i++) {
            if (this.insertadas[i].columna == casillero.columna)
                return false;
            if (this.insertadas[i].fila == casillero.fila)
                return false;
            if (Math.abs(this.insertadas[i].fila - casillero.fila) == Math.abs(this.insertadas[i].columna - casillero.columna))
                return false;
        }
        return true;
    };
    Tablero.prototype.insertarReina = function (casillero) {
        for (var i = 0; i < this.disponibles.length; i++) {
            if (this.disponibles[i].columna == casillero.columna) {
                this.disponibles.splice(i, 1);
                i--;
                continue;
            }
            if (this.disponibles[i].fila == casillero.fila) {
                this.disponibles.splice(i, 1);
                i--;
                continue;
            }
            if (Math.abs(this.disponibles[i].fila - casillero.fila) == Math.abs(this.disponibles[i].columna - casillero.columna)) {
                this.disponibles.splice(i, 1);
                i--;
                continue;
            }
        }
        this.insertadas.push(casillero);
    };
    Tablero.prototype.inicializarDisponibles = function () {
        this.disponibles = [];
        for (var f = 0; f < this.filas; f++) {
            for (var c = 0; c < this.columnas; c++) {
                this.disponibles.push(new Casillero(f, c));
            }
        }
    };
    Tablero.prototype.hacerCopia = function () {
        var tablero_copia = new Tablero();
        tablero_copia.filas = this.filas;
        tablero_copia.columnas = this.columnas;
        tablero_copia.disponibles = [];
        tablero_copia.insertadas = [];
        for (var _i = 0, _a = this.disponibles; _i < _a.length; _i++) {
            var disponible = _a[_i];
            tablero_copia.disponibles.push(new Casillero(disponible.fila, disponible.columna));
        }
        for (var _b = 0, _c = this.insertadas; _b < _c.length; _b++) {
            var insertada = _c[_b];
            tablero_copia.insertadas.push(new Casillero(insertada.fila, insertada.columna));
        }
        return tablero_copia;
    };
    Tablero.prototype.mostrarDisponibles = function () {
        $('.casilla-disponible').removeClass('casilla-disponible');
        for (var _i = 0, _a = this.disponibles; _i < _a.length; _i++) {
            var casillero = _a[_i];
            $('td[fila=' + casillero.fila + '][columna=' + casillero.columna + ']').addClass('casilla-disponible');
        }
    };
    return Tablero;
}());
exports.Tablero = Tablero;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TimeController = (function () {
    function TimeController() {
        this._interval_handle = null;
        TimeController.$time_counter = $('#time-counter');
    }
    Object.defineProperty(TimeController.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (new_time) {
            this._time = new_time;
        },
        enumerable: true,
        configurable: true
    });
    TimeController.prototype.mostrarTiempo = function () {
        TimeController.$time_counter.text(this._time);
    };
    TimeController.prototype.descontarTiempo = function () {
        this._time--;
        this.mostrarTiempo();
        if (this._time == TimeController.TIEMPO_FIN)
            TimeController.alAcabarse();
    };
    TimeController.prototype.empezarContador = function () {
        this._time = TimeController.SEGUNDOS;
        this.mostrarTiempo();
        this._interval_handle = setInterval(this.descontarTiempo.bind(this), 1e3);
    };
    TimeController.prototype.terminarContador = function () {
        if (this._interval_handle != null)
            clearInterval(this._interval_handle);
    };
    return TimeController;
}());
TimeController.SEGUNDOS = 10;
TimeController.TIEMPO_FIN = -1; // Vamos a contar al cero como un segundo más
exports.TimeController = TimeController;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = __webpack_require__(0);
var Turno_1 = __webpack_require__(1);
var Tablero_1 = __webpack_require__(4);
var AlfaBetaPruning_1 = __webpack_require__(2);
var Jugador_1 = __webpack_require__(3);
var TimeController_1 = __webpack_require__(5);
var time_controller;
var jugador_a;
var jugador_b;
var jugadores;
var Juego = (function () {
    function Juego() {
    }
    // El unico momento donde no cambiaremos el turno es al comienzo del juego
    Juego.siguienteTurno = function (cambiarTurno) {
        if (cambiarTurno === void 0) { cambiarTurno = true; }
        if (cambiarTurno == true) {
            window.turno.cambiar();
        }
        var jugador_actual = jugadores[window.turno.jugador_key];
        // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
        TimeController_1.TimeController.alAcabarse = jugador_actual.llegaAlLimiteDeTiempo
            .bind(jugador_actual);
        time_controller.terminarContador();
        time_controller.empezarContador();
        jugador_actual.empezarTurno();
    };
    Juego.DetenerJuego = function () {
        time_controller.terminarContador();
    };
    Juego.PierdeHumano = function () {
        alert('Perdiste!!');
        Juego.DetenerJuego();
    };
    Juego.GanaHumano = function () {
        alert('Has Ganado!!');
        Juego.DetenerJuego();
    };
    Juego.TerminarTurnoDeRobot = function () {
        if (window.tablero.esTerminal()) {
            Juego.PierdeHumano();
        }
        else {
            Juego.siguienteTurno();
        }
    };
    return Juego;
}());
$(function () {
    Globals_1._$.initElements();
    time_controller = new TimeController_1.TimeController();
    window.turno = new Turno_1.Turno();
    window.abp = new AlfaBetaPruning_1.AlfaBetaPruning();
    window.tablero = new Tablero_1.Tablero();
    window.tablero.inicializarDisponibles();
    jugador_a = new Jugador_1.Jugador('#human-icono');
    jugador_b = new Jugador_1.Jugador('#robot-icono');
    jugadores = [jugador_a, jugador_b];
    jugador_b.EsIA = true;
    // Callbacks: Que función se ejecutara cuando cada jugador termine su turnos
    jugador_a.alTerminar = Juego.siguienteTurno;
    jugador_b.alTerminar = Juego.TerminarTurnoDeRobot;
    Globals_1._$.play_button.on('click', function () {
        time_controller.empezarContador();
        window.turno.jugador_key = Math.floor(Math.random() * Globals_1.Globales.NUMERO_JUGADORES);
        if (window.turno.jugador_key == Turno_1.JugadorKey.JugadorB) {
            window.tablero.insertarReina(new Tablero_1.Casillero(Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)));
            Juego.siguienteTurno();
        }
        else {
            // Ejecutamos el siguiente turno para empezar el juego
            Juego.siguienteTurno(false);
        }
    });
    Globals_1._$.rollback_button.on('click', function () {
        Globals_1._$.rollback_button.hide();
        $('#human-box .rb-status').addClass('rb-used');
    });
    Globals_1._$.restart_button.on('click', function () {
        Globals_1._$.rollback_button.hide();
        $('td').removeClass("queen-images");
        $('#human-box .rb-status').removeClass('rb-used');
        Globals_1._$.rollback_button.show();
    });
    $('td').on('click', function () {
        var fila = parseInt($(this).attr('fila'));
        var columna = parseInt($(this).attr('columna'));
        var casillero = new Tablero_1.Casillero(fila, columna);
        if (window.tablero.reinaEsValidaEn(casillero)) {
            $(this).addClass('queen-images');
            window.tablero.insertarReina(casillero);
            window.tablero.mostrarDisponibles();
            jugador_a.puntos += Globals_1.Puntajes.JUGADA_CORRECTA;
            jugador_a.intentos_fallidos = 0;
            if (window.tablero.esTerminal() == false) {
                jugador_a.terminaTurno();
            }
            else {
                Juego.GanaHumano();
            }
        }
        else {
            jugador_a.puntos += Globals_1.Puntajes.JUGADA_INCORRECTA;
            if (jugador_a.intentos_fallidos + 1 == Globals_1.Globales.NUMERO_INTENTOS_TURNO) {
                Juego.PierdeHumano();
            }
            else {
                jugador_a.intentos_fallidos += 1;
            }
        }
        Globals_1._$.human_puntaje.text(jugador_a.puntos);
    });
});


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map