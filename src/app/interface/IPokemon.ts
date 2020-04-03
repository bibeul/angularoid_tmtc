import {IStat} from './IStat';
import {IType} from './IType';

export interface IPokemon {
  name: string;
  stats: IStat[];
  types: IType[];
  sprites: {
    back_default: string,
    front_default: string,
  };
};
