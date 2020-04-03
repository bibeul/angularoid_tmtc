import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../logic/pokemon/pokemon.service";
import {Pokemon} from '../../logic/pokemon/Pokemon';
import {Attack} from '../../logic/Attack';
import {Type} from '../../logic/Type';
import {Router} from "@angular/router";


@Component({
  selector: 'app-pokemon-selection',
  templateUrl: './pokemon-selection.component.html',
  styleUrls: ['./pokemon-selection.component.css']
})

export class PokemonSelectionComponent implements OnInit {


  private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/'
  public listOfSprite: number[];
  public pokemon;
  public pokemon1: Pokemon = undefined;
  public pokemon2: Pokemon = undefined;
  public pokemon1Id: number = undefined;
  public pokemon2Id: number = undefined;
  public listOfPokemon;

  constructor(public router: Router, private pokemonService: PokemonService) {
    this.listOfSprite = [];
    this.listOfPokemon = [];
  }

  ngOnInit(): void {
    this.counter(151);
  }

  private getPokemons(length): [] {
    for(let i = 1; i <= length; i++){
      let url = this.pokemonApiUrl + i + '/'
      this.listOfPokemon.push(this.pokemonService.getPokemonById(i).subscribe(pokemon => {
        console.log(Pokemon.createFromInterface(pokemon, [new Attack('griffe', Type.NORMAL, 40, false, 100)]));
        this.pokemon = pokemon;
      }));
    }
    console.log(this.listOfPokemon);
    return this.listOfPokemon;
  }

  getPokemon(id: number): Pokemon{
    let moves = [];
    this.pokemonService.getPokemonById(id).subscribe(pokemon => (this.pokemon = (Pokemon.createFromInterface(pokemon, moves))));
    return this.pokemon;
  }

  public counter(length): number[] {
    for(let i = 1; i <= length; i++){
      this.listOfSprite.push(i);
    }
    return this.listOfSprite;
  }

  public getListOfSprite(){
    return this.listOfSprite;
  }

  SelectYour(id: number): void {
    if (id != undefined) {
      this.pokemon1 = this.getPokemon(id);
      this.pokemon1Id =id;
    }
  }

  SelectEnnemy(id: number): void {
    if( id != undefined) {
      this.pokemon2 = this.getPokemon(id);
      this.pokemon2Id = id;
    }
  }

  getYourPokemon(): Pokemon{
    return this.pokemon1;
  }

  getYourPokemonId(): number{
    return this.pokemon1Id;
  }

  getEnnemyPokemon(): Pokemon{
    return this.pokemon2;
  }

  getEnnemyPokemonId(): number{
    return this.pokemon2Id;
  }

  fight(pokemon1Id: number, pokemon2Id: number) {
    if(pokemon1Id != undefined && pokemon2Id != undefined){
      this.router.navigate(['/battle/', pokemon1Id, pokemon2Id]);
    }
  }

}
