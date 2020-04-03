import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon} from '../../logic/Pokemon';
import {HttpClient} from '@angular/common/http';
import {IPokemon} from '../interface/IPokemon';
import {Attack} from '../../logic/Attack';
import {IMove} from '../interface/IMove';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonApiUrl = 'https://pokeapi.co/api/v2/'

  constructor(private http: HttpClient) { }

  getPokemonById(id: number): Observable<IPokemon> {
    const url = this.pokemonApiUrl + 'pokemon/' + id;
    return this.http.get<IPokemon>(url);
  }

  getAttackById(id: number): Observable<IMove>{
    const url = this.pokemonApiUrl + 'move/' + id;
    return this.http.get<IMove>(url);
  }
}
