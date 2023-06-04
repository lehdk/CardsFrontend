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


@NgModule({
  declarations: [
    AppComponent,
    LobbyOverviewComponent,
    LobbyComponent,
    LoginComponent,
    LobbyStatusToString
],
imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SignalrLobbyService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
