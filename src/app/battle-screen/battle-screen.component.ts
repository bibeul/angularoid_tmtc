import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../logic/Pokemon';
import {LogType, Type, typeObect} from '../../logic/Type';
import {RandomTool} from '../../logic/RandomTool';
import {Attack} from '../../logic/Attack';
import {Logs} from '../../logic/Log';
import {LogService} from '../services/log.service';
import {BattleService} from '../services/battle.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css'],
  providers: [ LogService, BattleService ]
})
export class BattleScreenComponent implements OnInit {
  text: string;
  logs: Logs[];
  startDate: Date = undefined;

  constructor(public logService: LogService, public battleService: BattleService) {
    this.text = '';
    this.logs = [];
  }

  ngOnInit(): void {
    const randomTool: RandomTool = new RandomTool(Math);
    const griffe = new Attack('griffe', Type.NORMAL, 40, false, 100);
    this.battleService.setPokemon1(new Pokemon('chenipan', [Type.GRASS],1000,1,33,33,33,33,33,[griffe], 'green'));
    this.battleService.setPokemon2(new Pokemon('pikachu', [Type.ELECTRIC],1000,1,33,33,33,33,33,[griffe], 'orange'));
    this.battleService.setTypeDict(typeObect);
    this.battleService.setRandomTool(randomTool);
    this.battleService.start().then(res =>  this.logService.addLog(new Logs(`Le gagnant est ${res.name}`, LogType.WINNER))).catch(e => console.log(e));
  }

  handlePause(initialState: boolean){
    this.startDate = this.logs.length === 0  ? new Date() : this.startDate;
    this.battleService.isPaused = initialState;
  }
}
