import {LogType} from './Type';

export class Logs{
  constructor(public log: string, public logType: LogType, public color: string = 'black') {
    this.color = logType === LogType.DEATH ? 'red' : this.color;
  }
}
