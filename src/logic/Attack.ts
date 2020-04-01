import {Type} from './Type';

export class Attack {

    constructor(public name: string, public readonly type: Type, public power: number, public special: boolean, public accuracy: number){

    }


}
