import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {map} from "rxjs/operators";
import {Pokemon} from '../../logic/Pokemon';
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
  private pokemon1: Pokemon;
  private pokemon2: Pokemon;
  private pokemon1Id: number;
  private pokemon2Id: number;
  public listOfPokemon;

  constructor(public router: Router, private pokemonService: PokemonService) {
    this.listOfSprite = [];
    this.listOfPokemon = [];
  }

  ngOnInit(): void {
    this.counter(151);
    this.getPokemons(1)
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
    let moves = [];
    this.pokemonService.getPokemonById(id).subscribe(pokemon => (this.pokemon1 = (Pokemon.createFromInterface(pokemon, moves))));
    this.pokemon1Id =id;
  }

  SelectEnnemy(id: number): void {
    let moves = [];
    this.pokemonService.getPokemonById(id).subscribe(pokemon => (this.pokemon2 = (Pokemon.createFromInterface(pokemon, moves))));
    this.pokemon2Id =id;
  }

  getYourPokemon(): Pokemon{
    return this.pokemon1;
  }

  getEnnemyPokemon(): Pokemon{
    return this.pokemon2;
  }

  fight(pokemon1: Pokemon, pokemon2: Pokemon) {
    if(pokemon1 != undefined && pokemon2 != undefined){
      this.router.navigate(['/battle/', pokemon1, pokemon2]);
    }
  }

}


