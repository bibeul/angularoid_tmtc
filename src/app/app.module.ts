import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleScreenComponent } from './battle-screen/battle-screen.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { PauseButtonComponent } from './pause-button/pause-button.component';
import { PokemonSelectionComponent } from './pokemon-selection/pokemon-selection.component';
import {ColoredLogDirective} from './directive/coloredLog.directive';
import {LogService} from './services/log.service';
import {BattleService} from './services/battle.service';
import { PokemonComponent } from './pokemon/pokemon.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {PokemonService} from './services/pokemon.service';

function HomeComponent() {

}

@NgModule({
  declarations: [
    AppComponent,
    BattleScreenComponent,
    StatusBarComponent,
    PauseButtonComponent,
    PokemonSelectionComponent,
    ColoredLogDirective,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    LogService,
    BattleService,
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
