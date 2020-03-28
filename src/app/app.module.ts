import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConfigPanelComponent } from './config-panel/config-panel.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameControlComponent } from './game-control/game-control.component';
import { ArenaComponent } from './arena/arena.component';
import { BotPanelComponent } from './bot-panel/bot-panel.component';
import { EnumToArrayPipe } from './enumtoarray.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConfigPanelComponent,
    LeaderboardComponent,
    GameControlComponent,
    ArenaComponent,
    BotPanelComponent,
    EnumToArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
