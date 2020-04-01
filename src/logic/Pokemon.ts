import {Attack} from './Attack';
import {Type} from './Type';

export class Pokemon {
    public hpmax : number;
  // tslint:disable-next-line:max-line-length
    constructor(public readonly name: string, public readonly type: Type[], public hp: number, public level: number, public speed: number, public attack: number, public attackSpe: number, public def: number, public defSpe: number, public mooveSet: Attack[], public color: string = 'black'){
        // const indice = Math.floor(2 * seedValue)
        this.hpmax = hp;
    }

    isAlive(): boolean {
        return this.hp > 0;
    }
}
