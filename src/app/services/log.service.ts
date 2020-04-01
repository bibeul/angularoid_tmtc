import { Injectable } from '@angular/core';
import {Logs} from '../../logic/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly logs: Logs[];
  constructor() {
    this.logs = [];
  }

  getLogs(): Logs[] {
    return this.logs;
  }

  addLog(log: Logs): void {
    this.logs.push(log);
  }
}
