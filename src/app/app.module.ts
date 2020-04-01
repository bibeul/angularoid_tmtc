import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleScreenComponent } from './battle-screen/battle-screen.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { PauseButtonComponent } from './pause-button/pause-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BattleScreenComponent,
    StatusBarComponent,
    PauseButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
