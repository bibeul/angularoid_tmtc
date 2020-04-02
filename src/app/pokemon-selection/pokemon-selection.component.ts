import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-pokemon-selection',
  templateUrl: './pokemon-selection.component.html',
  styleUrls: ['./pokemon-selection.component.css']
})

export class PokemonSelectionComponent implements OnInit {

  public listOfSprite: number[];
  private selectedPokemon : number;

  constructor() {
    this.listOfSprite = [];
  }

  ngOnInit(): void {
    this.counter(151);
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

  onSelect(id: number): void {
    this.selectedPokemon = id;
  }

  getSelectedPokemon(): number{
    return this.selectedPokemon
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // getProducts(): Observable<any> {
  //   return this.http.get(endpoint + 'products').pipe(
  //     map(this.extractData));
  // }
}


