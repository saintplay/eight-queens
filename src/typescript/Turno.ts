import { Globales } from "./Globals";

export enum JugadorKey {
    JugadorA = 0,
    JugadorB = 1,
}

export class Turno {
    private _jugador_actual_key: JugadorKey = JugadorKey.JugadorA;

    get jugador_key() {
        return this._jugador_actual_key;
    }

    set jugador_key(new_key: JugadorKey) {
        this._jugador_actual_key = new_key;
    }
    
    cambiar() {
        if (this._jugador_actual_key + 1 == Globales.NUMERO_JUGADORES) {
            this._jugador_actual_key
        } else {
            this._jugador_actual_key++;
        }
    }
}

export let turno: Turno;