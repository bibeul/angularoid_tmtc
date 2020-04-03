import {Type} from '../../logic/Type';

export interface IMove {
  accuracy: number;
  name: string;
  power: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
}
