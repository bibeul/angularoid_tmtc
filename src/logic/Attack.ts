import {Type} from './Type';
import {IMove} from '../app/interface/IMove';

export class Attack {

    constructor(public name: string, public readonly type: Type, public power: number, public special: boolean, public accuracy: number){
    }

    static createFromInterface(move: IMove): Attack {
      const isSpe = !(move.damage_class.name === 'physical');
      return new Attack(move.name, Type[move.type.name.toUpperCase()], move.power, isSpe, move.accuracy);
    }

}
