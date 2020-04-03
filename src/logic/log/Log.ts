import {LogType} from '../Type';

export class Logs{
  constructor(public log: string, public logType: LogType, public color: string = 'black', public pokemon: number = -1) {
    this.color = logType === LogType.DEATH ? 'red' : this.color;
  }
}
