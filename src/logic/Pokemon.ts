import {Attack} from './Attack';
import {Type} from './Type';

export class Pokemon {

    constructor(public readonly name: string, public readonly type: Type[], public hp: number, public level: number, public speed: number, public attack: number, public attackSpe: number, public def: number, public defSpe: number, public mooveSet: Attack[]){
        // const indice = Math.floor(2 * seedValue)

    }

    isAlive(): boolean {
        return this.hp > 0;
    }
}
