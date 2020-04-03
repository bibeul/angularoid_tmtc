import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../logic/Pokemon';
import {LogType, Type, typeObect} from '../../logic/Type';
import {RandomTool} from '../../logic/RandomTool';
import {Attack} from '../../logic/Attack';
import {Logs} from '../../logic/Log';
import {LogService} from '../services/log.service';
import {BattleService} from '../services/battle.service';
import {animate, keyframes, query, state, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";
import {PokemonSelectionComponent} from '../pokemon-selection/pokemon-selection.component';
import {PokemonService} from '../services/pokemon.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css'],
  providers: [ LogService, BattleService ],
  animations:[
    trigger('you-hit',[
      transition('*=>you-hit',animate('1000ms',keyframes([
        style({transform:'translateX(100px) translateY(-50px)',offset:0.4}),
        style({transform:'translateX(0px)',offset:0.6}),
      ]))),

    ]),
    trigger('enemy-hit',[
      transition('*=>enemy-hit',animate('1000ms',keyframes([
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
  constructor(public logService: LogService, public battleService: BattleService, public pokemonService: PokemonService) {
    this.text = '';
  }

  ngOnInit(): void {
    const moves = [];
    const pokemons: Pokemon[] = [];
    const randomTool: RandomTool = new RandomTool(Math);
    const griffe = new Attack('griffe', Type.NORMAL, 40, false, 100);
    this.pokemonService.getAttackById(3).subscribe(attack => moves.push(Attack.createFromInterface(attack)));
    this.pokemonService.getPokemonById(2).subscribe(pokemon => pokemons.push((Pokemon.createFromInterface(pokemon, moves, 'green'))));
    console.log(pokemons)
    this.battleService.setPokemon1(pokemons);
    this.battleService.setPokemon2(new Pokemon('pikachu', [Type.ELECTRIC],1000,1,33,33,33,33,33,[griffe], 'orange'));
    this.battleService.setTypeDict(typeObect);
    this.battleService.setRandomTool(randomTool);
    this.subscriber = this.battleService.start().subscribe(
      res =>  {
        this.logService.addLog(new Logs(`Le gagnant est ${res.name}`, LogType.WINNER));
        this.subscriber.unsubscribe();
      },
      error => console.error('onError: %s', error),
      () => this.subscriber.unsubscribe()
    );
  }

  handlePause(initialState: boolean){
    this.startDate = this.logService.getLogs().length === 0  ? new Date() : this.startDate;
    this.battleService.isPaused = initialState;
  }

  yourHitAnimation(hit: string){
    this.youHit = hit;
  }
  enemyHitAnimation(hit: string){
    this.enemyHit = hit;
  }
}
