import {Attack} from './Attack';
import {Type} from './Type';
import {IPokemon} from '../app/interface/IPokemon';

export class Pokemon {
    public hpmax : number;
    public owner:number;
  // tslint:disable-next-line:max-line-length
    constructor(public readonly name: string, public readonly type: Type[], public hp: number, public level: number, public speed: number, public attack: number, public attackSpe: number, public def: number, public defSpe: number, public mooveSet: Attack[], public color: string = 'black',public front_sprite_url:string="" ,public back_sprite_url:string=""){
        // const indice = Math.floor(2 * seedValue)
        this.hpmax = hp;
        this.owner = -1;
    }

    static createFromInterface(pokemon: IPokemon, moveSet: Attack[], color: string ='black'): Pokemon {
      return new Pokemon(
        pokemon.name,
        pokemon.types.map(value => Type[value.type.name.toUpperCase()]),
        pokemon.stats[5].base_stat,
        1,
        pokemon.stats[0].base_stat,
        pokemon.stats[4].base_stat,
        pokemon.stats[2].base_stat,
        pokemon.stats[3].base_stat,
        pokemon.stats[1].base_stat,
        moveSet,
        color,
        pokemon.sprites.front_default,
        pokemon.sprites.back_default
      );
    }

    isAlive(): boolean {
        return this.hp > 0;
    }
}
