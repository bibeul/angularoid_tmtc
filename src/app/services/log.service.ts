import {Injectable} from '@angular/core';
import {Logs} from '../../logic/Log';
import {LogType} from '../../logic/Type';

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

  addLog(log: Logs): void {
    this.lastLog = log;
    this.logs.push(log);
  }

  isLastLogAttack(): string {
    console.log(this.lastLog.logType)
    console.log(this.lastLog.logType === LogType.ATTACK ? 'hit' : '');
    return this.lastLog.logType === LogType.ATTACK ? 'hit' : '';
  }
}
