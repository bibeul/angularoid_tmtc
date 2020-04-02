import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import { RandomTool} from '../../logic/RandomTool';
import {Attack} from '../../logic/Attack';
import {LogType, Type, typeObect} from '../../logic/Type';
import {Pokemon} from '../../logic/Pokemon';
import {Logs} from '../../logic/Log';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Test Battle', () => {

  let griffe;
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);
    const random = jest.fn().mockReturnValue(true);
    jest.mock('../../logic/RandomTool', () => {
      return jest.fn().mockImplementation(() => {
        return {random};
      });
    });
    const randomTool: RandomTool = new RandomTool(Math);
    griffe = new Attack('griffe', Type.NORMAL, 40, false, 100);
    service.setPokemon1(new Pokemon('chenipan', [Type.GRASS],1000,1,33,33,33,33,33,[griffe], 'green'));
    service.setPokemon2(new Pokemon('pikachu', [Type.ELECTRIC],500,1,33,33,33,33,33,[griffe], 'orange'));
    service.setTypeDict(typeObect);
    service.setRandomTool(randomTool);
  });

  test('Should battle', async () => {
    const subscriber = service.start().subscribe(
      res =>  {
        expect(res).toBe(service.pokemon1);
        subscriber.unsubscribe();
      },
    );
  });

  test('Should apply damage', () => {
    service.attack(service.pokemon1, service.pokemon2, griffe);
    expect(service.pokemon2.hp).toBe(418);
  });

  test('checkForStrenghtAndWeekness apply good modificator * 4', () => {
    const res = service.checkForStrenghtAndWeekness([Type.FLYING, Type.WATER], Type.ELECTRIC);
    expect(res).toBe(4);
  });

  test('checkForStrenghtAndWeekness apply good modificator * 2', () => {
    const res = service.checkForStrenghtAndWeekness([Type.WATER], Type.ELECTRIC);
    expect(res).toBe(2);
  });

  test('checkForStrenghtAndWeekness apply good modificator * 0.5', () => {
    const res = service.checkForStrenghtAndWeekness([Type.GRASS], Type.WATER);
    expect(res).toBe(0.5);
  });

  test('checkForStrenghtAndWeekness apply good modificator * 0.25', () => {
    const res = service.checkForStrenghtAndWeekness([Type.DRAGON, Type.GRASS], Type.WATER);
    expect(res).toBe(0.25);
  });

  test('checkForStrenghtAndWeekness apply good modificator * 0', () => {
    const res = service.checkForStrenghtAndWeekness([Type.FLYING], Type.GROUND);
    expect(res).toBe(0);
  });
});
