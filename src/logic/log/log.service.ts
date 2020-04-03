import {Injectable} from '@angular/core';
import {Logs} from './Log';
import {LogType} from '../Type';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly logs: Logs[];
  public lastLog: Logs;
  constructor() {
    this.logs = [];
    this.lastLog = new Logs('', LogType.DAMAGE);
  }

  getLogs(): Logs[] {
    return this.logs;
  }

  getLastLogs(): Logs[]{
      return this.logs.slice(Math.max(this.logs.length - 5, 0));
  }

  addLog(log: Logs): void {
    this.lastLog = log;
    console.log(log.pokemon)
    this.logs.push(log);
  }

  isLastLogAttack(): string {
    if(this.lastLog.pokemon === 0 ){
      return 'you-hit';
    }else if (this.lastLog.pokemon === 1){
      return 'enemy-hit';
    }
    return '';
  }
}
