import {Pokemon} from './Pokemon';
import {Attack} from './Attack';
import {Type} from './Type';
import {RandomTool} from './RandomTool';
import {InlineDeclaration} from '@angular/compiler-cli/src/ngtsc/reflection';
import {EventEmitter} from '@angular/core';

export class Battle extends EventEmitter<string> {
  // tslint:disable-next-line:ban-types
  public intervalId;
  public typeDict: Object;
  public isPaused: boolean;
  constructor(private readonly pokemon1: Pokemon , private pokemon2: Pokemon, typeDict: Array<Object>, public randomTool: RandomTool){
        super();
        this.typeDict = Battle.loadTypeDict(typeDict);
        this.isPaused = true;
    }

    static loadTypeDict(typeDict: Array<Object>): Object{
         const result: Object = {};
         typeDict.forEach(type => {
            result[type['name']] = type;
         });
         return result;
    }
    start(): Promise<Pokemon> {
        return new Promise((resolve, reject) => {
            this.intervalId = setInterval(() => {
                let winner: Pokemon = this.pokemon1;

                const pokemonOrder: Pokemon[] = this.priority(this.pokemon1, this.pokemon2);

                this.round(pokemonOrder[0], pokemonOrder[1]);

                if (!this.pokemon1.isAlive()) {
                    winner = this.pokemon2;
                    resolve(winner);
                    clearInterval(this.intervalId);
                    return;
                } else if (!this.pokemon2.isAlive()) {
                    resolve(winner);
                    clearInterval(this.intervalId);
                    return;
                }
            }, 1);
        });
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
        damage = damage + (damage * critical) * accuracy;

        if (accuracy === 1){
            this.displayWeakness(multiplicator);
            this.displayDamageTaken(receiver, damage);
        }else{
            this.displayAttackMissed(accuracy);
      }

        this.emit(receiver.name + ' perd ' + damage + ' hp ');
        receiver.hp = receiver.hp - damage;
    }

    public round(first: Pokemon, second: Pokemon){
      if (!this.isPaused){
        this.attack(first, second, first.mooveSet[0]);
        if (second.isAlive()){
          this.attack(second, first, second.mooveSet[0]);
        }
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
            this.emit('C\'est super efficace !');
        }else if (multiplicator === 0.5 || multiplicator === 0.25){
            this.emit('Ce n\'est pas très efficace ...');
        }else if (multiplicator === 0){
            this.emit('Aucun effet');
        }else if (multiplicator === 4){
            this.emit('C\'est super efficace !!!!!!!');
        }
    }

    displayMooveUsed(attacker: Pokemon, moove: Attack, receiver: Pokemon): void{
        this.emit(attacker.name + ' lance ' + moove.name + ' sur ' + receiver.name);
    }

    displayDamageTaken(receiver: Pokemon, damage: number): void{
        this.emit(receiver.name + ' subit ' + damage + ' damage ');
    }

    displayAttackMissed(isMissed: number){
        if (isMissed === 0){
            this.emit('Attack is missed');
        }
    }

    random(rate: number){
        if (this.randomTool.random(rate)){
            return 1;
        }
        return 0;
    }

}
