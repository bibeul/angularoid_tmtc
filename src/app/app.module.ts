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

@NgModule({
  declarations: [
    AppComponent,
    BattleScreenComponent,
    StatusBarComponent,
    PauseButtonComponent,
    PokemonSelectionComponent,
    ColoredLogDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LogService,
    BattleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
