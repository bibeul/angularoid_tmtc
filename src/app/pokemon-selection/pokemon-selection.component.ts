import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pokemon-selection',
  templateUrl: './pokemon-selection.component.html',
  styleUrls: ['./pokemon-selection.component.css']
})

export class PokemonSelectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedPokemon : number
  onSelect(id: number): void {
    this.selectedPokemon = id
  }

}
