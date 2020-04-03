import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon} from './Pokemon';
import {HttpClient} from '@angular/common/http';
import {IPokemon} from '../../app/interface/IPokemon';
import {Attack} from '../Attack';
import {IMove} from '../../app/interface/IMove';

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

  getPokemonByIdP(id: number): Promise<IPokemon> {
    const url = this.pokemonApiUrl + 'pokemon/' + id;
    return this.http.get<IPokemon>(url).toPromise().then(data => data);
  }
  getAttackById(id: number): Observable<IMove>{
    const url = this.pokemonApiUrl + 'move/' + id;
    return this.http.get<IMove>(url);
  }
}
