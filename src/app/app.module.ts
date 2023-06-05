import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyOverviewComponent } from './lobby-overview/lobby-overview.component';
import { LobbyComponent } from './lobby/lobby.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LobbyStatusToString } from './models/GameLobby.model';
import { SignalrLobbyService } from './services/signalr-lobby.service';
import { PlayerService } from './services/player.service';
import { CardGameComponent } from './card-game/card-game.component';
import { CardToString, RankToString, SuiteToString } from './models/card.models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    LobbyOverviewComponent,
    LobbyComponent,
    LoginComponent,
    LobbyStatusToString,
    SuiteToString,
    RankToString,
    CardToString,
    CardGameComponent,
    CardComponent
],
imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CdkDrag,
    CdkDropList
  ],
  providers: [SignalrLobbyService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
