import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../logic/Pokemon';
import {LogType, Type, typeObect} from '../../logic/Type';
import {RandomTool} from '../../logic/RandomTool';
import {Attack} from '../../logic/Attack';
import {Logs} from '../../logic/Log';
import {LogService} from '../services/log.service';
import {BattleService} from '../services/battle.service';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css'],
  providers: [ LogService, BattleService ],
  animations:[
    trigger('you-hit',[
      transition('*=>hit',animate('1000ms',keyframes([
        style({transform:'translateX(100px) translateY(-50px)',offset:0.4}),
        style({transform:'translateX(0px)',offset:0.6}),
      ]))),

    ]),
    trigger('enemy-hit',[
      transition('*=>hit',animate('1000ms',keyframes([
        style({transform:'translateX(-100px) translateY(+50px)',offset:0.4}),
        style({transform:'translateX(0px)',offset:0.6}),
      ]))),
    ])
  ]

})
export class BattleScreenComponent implements OnInit {
  text: string;
  startDate: Date = undefined;
  subscriber;
  youHit: string;
  enemyHit: string;
  constructor(public logService: LogService, public battleService: BattleService) {
    this.text = '';
  }

  ngOnInit(): void {
    const randomTool: RandomTool = new RandomTool(Math);
    const griffe = new Attack('griffe', Type.NORMAL, 40, false, 100);
    this.battleService.setPokemon1(new Pokemon('chenipan', [Type.GRASS],1000,1,32,33,33,33,33,[griffe], 'green'));
    this.battleService.setPokemon2(new Pokemon('pikachu', [Type.ELECTRIC],1000,1,33,33,33,33,33,[griffe], 'orange'));
    this.battleService.setTypeDict(typeObect);
    this.battleService.setRandomTool(randomTool);
    this.subscriber = this.battleService.start().subscribe(
      res =>  this.logService.addLog(new Logs(`Le gagnant est ${res.name}`, LogType.WINNER)),
      error => console.error('onError: %s', error),
      () => this.subscriber.unsubscribe()
    );

  }

  handlePause(initialState: boolean){
    this.startDate = this.logService.getLogs().length === 0  ? new Date() : this.startDate;
    this.battleService.isPaused = initialState;
  }

  yourHitAnimation(hit:string){
    this.youHit=hit;
  }
  enemyHitAnimation(hit:string){
    this.enemyHit=hit;
  }
}
