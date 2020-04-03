import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {Pokemon} from '../pokemon/Pokemon';
import {RandomTool} from '../RandomTool';
import {LogService} from '../log/log.service';
import {Logs} from '../log/Log';
import {LogType, Type} from '../Type';
import {Attack} from '../Attack';
import {DecimalPipe} from '@angular/common';
import { interval, Observable, Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class BattleService {
// tslint:disable-next-line:ban-types
  public intervalId;
  public typeDict: Object;
  public isPaused = true;
  public randomTool : RandomTool;
  public pokemon1: Pokemon;
  public pokemon2: Pokemon;
  private pokemonOrder: Pokemon[];
  private decimalPipe: DecimalPipe;
  private roundCounter = 0;
  public pokemons: Pokemon[];
  constructor(private logger: LogService, @Inject(LOCALE_ID) private locale: string){
    this.decimalPipe = new DecimalPipe(locale);
  }

  setPokemons(pokemons: Pokemon[]): void {
    console.log(this.pokemons);
    this.pokemons = pokemons;
    this.pokemon1 = pokemons[0];
    this.pokemon2 = pokemons[1];
  }

  getHpStatusBarPokemon1(): string{
    let hpyouValue = ((this.pokemon1.hp / this.pokemon1.hpmax) * 100);
    hpyouValue = hpyouValue >= 0 ? hpyouValue : 0;
    console.log(`${hpyouValue}px`);
    return `${hpyouValue}px`;
  }

  getHpStatusBarPokemon2(): string{
    let hpyouValue = ((this.pokemon2.hp / this.pokemon2.hpmax) * 100);
    hpyouValue = hpyouValue >= 0 ? hpyouValue : 0;
    return `${hpyouValue}px`;
  }

  setTypeDict(typeDict: Array<Object>){
    this.typeDict = this.loadTypeDict(typeDict);
  }
  async setPokemon1(pokemon: Pokemon): Promise<void>  {
    this.pokemon1 = pokemon;
  }

  async setPokemon2(pokemon: Pokemon): Promise<void> {
    this.pokemon2 = pokemon;
  }
  setRandomTool(randomTool: RandomTool){
    this.randomTool = randomTool;
  }

  loadTypeDict(typeDict: Array<Object>): Object{
    const result: Object = {};
    typeDict.forEach(type => {
      result[type['name']] = type;
    });
    return result;
  }

   start(): Observable<Pokemon> {
    return interval(1000)
       .pipe(map(() => {
          this.pokemon1.owner = 0;
          this.pokemon2.owner = 1;
          let winner: Pokemon = this.pokemon1;
          if(this.roundCounter === 0){
            this.pokemonOrder = this.priority(this.pokemon1, this.pokemon2);
          }

          this.round(this.pokemonOrder[this.roundCounter], this.pokemonOrder[(this.roundCounter + 1) % 2]);
          this.roundCounter = (this.roundCounter + 1) % 2;
          if (!this.pokemon1.isAlive()) {
            this.logger.addLog(new Logs(`${this.pokemon1.name} est mort !`, LogType.DEATH));
            winner = this.pokemon2;
            return winner;
          } else if (!this.pokemon2.isAlive()) {
            this.logger.addLog(new Logs(`${this.pokemon2.name} est mort !`, LogType.DEATH));
            return winner;
          }
        })).pipe(filter((v) => !!v)) as Observable<Pokemon>;
  }
  // L Level P
  // Damage = floor(floor(floor(2 * L / 5 + 2) * A * P / D) / 50) + 2
  public attack(attacker: Pokemon, receiver: Pokemon, moove: Attack): void{
    this.displayMooveUsed(attacker, moove, receiver);
    let A = attacker.attack;
    let D = receiver.def;
    if (moove.special === true){
      A = attacker.attackSpe;
      D = receiver.defSpe;
    }
    const basedamage = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * A * moove.power / D)) + 2;
    const multiplicator = this.checkForStrenghtAndWeekness(receiver.type, moove.type);
    const critical = this.random(6);
    const accuracy = this.random(moove.accuracy); // this return 1 or 0

    let damage = (basedamage * multiplicator);
    damage = (damage + (damage * critical) ) * accuracy;

    if (accuracy === 1){
      this.displayWeakness(multiplicator);
      this.displayDamageTaken(receiver, damage);
    }else{
      this.displayAttackMissed(accuracy);
    }

    this.logger.addLog(new Logs(receiver.name + ' perd ' + this.decimalPipe.transform(damage, '1.2') + ' hp ', LogType.ATTACK, receiver.color,attacker.owner));
    receiver.hp = receiver.hp - damage;
  }

  public async round(first: Pokemon, second: Pokemon){
    if (!this.isPaused){
      this.attack(first, second, first.mooveSet[0]);
    }
  }

  public priority(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon[]{
    const result: Pokemon[] = [];
    if (pokemon2.speed === pokemon1.speed){
      const res: boolean = this.randomTool.random(50);
      if (res){
        result.push(pokemon1);
        result.push(pokemon2);
        return result;
      }
      result.push(pokemon2);
      result.push(pokemon1);
      return result;
    }
    if (pokemon1.speed > pokemon2.speed){
      result.push(pokemon1);
      result.push(pokemon2);
    }else{
      result.push(pokemon2);
      result.push(pokemon1);
    }
    return result;
  }

  public checkForStrenghtAndWeekness(receiverTypes: Type[], mooveType: Type): number {
    let result = 1;
    let immune = false;
    receiverTypes.forEach(type => {
      if (this.typeDict[mooveType].strengths.includes(type)){
        result = result * 2;
      }else if (this.typeDict[mooveType].weaknesses.includes(type)){
        result = result * 0.5;
      }else if (this.typeDict[mooveType].immunes.includes(type)){
        immune = true;
      }
    });
    if (immune){
      return 0;
    }
    return result;
  }

  displayWeakness(multiplicator: number): void{
    if (multiplicator === 2){
      this.logger.addLog(new Logs('C\'est super efficace !', LogType.EFFECTIVE));
    }else if (multiplicator === 0.5 || multiplicator === 0.25){
      this.logger.addLog(new Logs('Ce n\'est pas très efficace ...', LogType.NOT_EFFECTIVE));
    }else if (multiplicator === 0){
      this.logger.addLog(new Logs('Aucun effet', LogType.NO_EFFECT));
    }else if (multiplicator === 4){
      this.logger.addLog(new Logs('C\'est super efficace !!!!!!!', LogType.VERY_EFFECTIVE));
    }
  }

  displayMooveUsed(attacker: Pokemon, moove: Attack, receiver: Pokemon): void{
    this.logger.addLog(new Logs(attacker.name + ' lance ' + moove.name + ' sur ' + receiver.name, LogType.ATTACK, attacker.color));
  }

  displayDamageTaken(receiver: Pokemon, damage: number): void{
    this.logger.addLog(new Logs(receiver.name + ' subit ' + this.decimalPipe.transform(damage, '1.2') + ' damage ', LogType.ATTACK, receiver.color));
  }

  displayAttackMissed(isMissed: number){
    if (isMissed === 0){
      this.logger.addLog(new Logs('Attack is missed', LogType.MISS));
    }
  }

  random(rate: number){
    if (this.randomTool.random(rate)){
      return 1;
    }
    return 0;
  }
}
