import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonComponent} from "./pokemon/pokemon.component";
import {BattleScreenComponent} from "./battle-screen/battle-screen.component";
import {PokemonSelectionComponent} from "./pokemon-selection/pokemon-selection.component";


const routes: Routes = [
  { path: '', component: PokemonSelectionComponent }, // path: '/'
  { path: 'battle/:id1/:id2', component: BattleScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
