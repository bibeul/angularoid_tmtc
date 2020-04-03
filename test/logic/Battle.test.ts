import {RandomTool} from '../../src/logic/RandomTool';
import {Type, typeObect} from '../../src/logic/Type';
import {Pokemon} from '../../src/logic/pokemon/Pokemon';
import {Attack} from '../../src/logic/Attack';
import {Battle} from '../../src/logic/Battle';

describe('Test Battle', () => {

    let griffe;
    let chenipan;
    let ferossinge;
    let battle: Battle;

    beforeEach(() => {
        const random = jest.fn().mockReturnValueOnce(false);
        jest.mock('../../src/logic/RandomTool', () => {
            return jest.fn().mockImplementation(() => {
                return {random};
            });
        });
        const randomTool: RandomTool = new RandomTool(Math);
        randomTool.random = jest.fn().mockReturnValueOnce(false);
        griffe = new Attack('griffe', Type.NORMAL, 40, false, 100);
        chenipan = new Pokemon('Chenipan', [Type.GRASS], 100, 1, 34, 33, 33, 33, 33, [griffe]);
        ferossinge = new Pokemon('Ferossinge', [Type.GRASS], 100, 1, 33, 33, 33, 33, 33, [griffe]);
        battle = new Battle(chenipan, ferossinge, typeObect, randomTool);
    });

    test('Should apply damage', () => {
        battle.attack(chenipan, ferossinge, griffe);

        expect(ferossinge.hp).toBe(18);
    });

    test('Should battle', async () => {
            battle.start().then(res => expect(res).toBe(chenipan));
    });

});

describe('Test weakness and strenghts', () => {
    const randomTool: RandomTool = new RandomTool(Math);
    const pkm1 = new Pokemon('Chenipan', [Type.GRASS], 1000, 1, 34, 33, 33, 33, 33, []);
    const pkm2 = new Pokemon('Ferossinge', [Type.GRASS], 1000, 1, 33, 33, 33, 33, 33, []);
    const battle = new Battle(pkm1, pkm2, typeObect, randomTool);
    test('checkForStrenghtAndWeekness apply good modificator * 4', () => {
        const res = battle.checkForStrenghtAndWeekness([Type.FLYING, Type.WATER], Type.ELECTRIC);
        expect(res).toBe(4);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 2', () => {
        const res = battle.checkForStrenghtAndWeekness([Type.WATER], Type.ELECTRIC);
        expect(res).toBe(2);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 0.5', () => {
        const res = battle.checkForStrenghtAndWeekness([Type.GRASS], Type.WATER);
        expect(res).toBe(0.5);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 0.25', () => {
        const res = battle.checkForStrenghtAndWeekness([Type.DRAGON, Type.GRASS], Type.WATER);
        expect(res).toBe(0.25);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 0', () => {
        const res = battle.checkForStrenghtAndWeekness([Type.FLYING], Type.GROUND);
        expect(res).toBe(0);
    });
});
