import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../logic/pokemon/Pokemon';
import {LogType, Type, typeObect} from '../../logic/Type';
import {RandomTool} from '../../logic/RandomTool';
import {Attack} from '../../logic/Attack';
import {Logs} from '../../logic/log/Log';
import {LogService} from '../../logic/log/log.service';
import {BattleService} from '../../logic/battle/battle.service';
import {animate, keyframes, query, state, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";
import {PokemonSelectionComponent} from '../pokemon-selection/pokemon-selection.component';
import {PokemonService} from '../../logic/pokemon/pokemon.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

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
  isStarted = false;
  constructor(public router: Router, public logService: LogService, public battleService: BattleService, public pokemonService: PokemonService, private route: ActivatedRoute) {
    this.text = '';
  }

  async ngOnInit(): Promise<void> {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const id1 = Number(snapshot.params.id1);
    const id2 = Number(snapshot.params.id2);
    const moves = [];
    const randomTool: RandomTool = new RandomTool(Math);

    const griffe = new Attack('griffe', Type.NORMAL, 10, false, 100);
    this.pokemonService.getAttackById(3).subscribe(async attack => await moves.push(Attack.createFromInterface(attack)));
    await this.battleService.setPokemon1(Pokemon.createFromInterface(await this.pokemonService.getPokemonByIdP(id1), moves, 'green'))
    await this.battleService.setPokemon2(Pokemon.createFromInterface(await this.pokemonService.getPokemonByIdP(id2), moves, 'orange'))
    this.battleService.setTypeDict(typeObect);
    this.battleService.setRandomTool(randomTool);
  }

  handlePause(initialState: boolean){
    if(!this.isStarted) {
      this.subscriber = this.battleService.start().subscribe(
        res =>  {
          this.logService.addLog(new Logs(`Le gagnant est ${res.name}`, LogType.WINNER));
          this.subscriber.unsubscribe();
        },
        error => console.error('onError: %s', error),
        () => this.subscriber.unsubscribe()
      );
      this.isStarted = true;
    }
    this.startDate = this.logService.getLogs().length === 0  ? new Date() : this.startDate;
    this.battleService.isPaused = initialState;
  }

  yourHitAnimation(hit: string){
    this.youHit = hit;
  }
  enemyHitAnimation(hit: string){
    this.enemyHit = hit;
  }

  selectionPokemon() {
    this.router.navigate(['/']);
  }
}
