import {Pokemon} from "../../src/logic/pokemon/Pokemon";
import {Type} from "../../src/logic/Type";


test('Should create Pokemon', () => {
    const chenipan:Pokemon = new Pokemon("chenipan", [Type.GRASS],0,1,33,33,33,33,33,[]);
});

test('Should return false', () => {
    const chenipan:Pokemon = new Pokemon("chenipan", [Type.GRASS],0,1,33,33,33,33,33,[]);
    expect(chenipan.isAlive()).toBe(false);
});
