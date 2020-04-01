import { Component, OnInit } from '@angular/core';
import {Battle} from '../../logic/Battle';
import {Pokemon} from '../../logic/Pokemon';
import {Type, typeObect} from '../../logic/Type';
import {RandomTool} from '../../logic/RandomTool';
import {Attack} from '../../logic/Attack';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {
  text: string;
  logs: string[];
  battle: Battle;

  constructor() {
    this.text = '';
    this.logs = [];
  }

  ngOnInit(): void {
    const randomTool: RandomTool = new RandomTool(Math);
    const griffe = new Attack('griffe', Type.NORMAL, 40, false, 100);
    const pokemon1 = new Pokemon('chenipan', [Type.GRASS],1000,1,33,33,33,33,33,[griffe]);
    const pokemon2 = new Pokemon('pikachu', [Type.ELECTRIC],1000,1,33,33,33,33,33,[griffe]);
    this.battle = new Battle(pokemon1, pokemon2, typeObect, randomTool);
    this.battle.start().then(res => this.addLog(`winner is ${res.name}`)).catch(e => console.log(e));
    this.battle.subscribe(this.addLog.bind(this));
  }

  addLog(log: string): void{
    this.logs.push(log);
  }

  handlePause(initialState: boolean){
    this.battle.isPaused = initialState;
  }
}
