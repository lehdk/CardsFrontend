import { Component, OnInit } from '@angular/core';
import { GameLobby } from '../models/GameLobby.model';
import { Router } from '@angular/router';
import { SignalrLobbyService } from '../services/signalr-lobby.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-lobby-overview',
  templateUrl: './lobby-overview.component.html',
  styleUrls: ['./lobby-overview.component.scss']
})
export class LobbyOverviewComponent implements OnInit {

    lobbies: GameLobby[] = [];

    isLoaded: boolean = false;

    constructor(private router: Router, private lobbySignalr: SignalrLobbyService, private playerService: PlayerService) {
        this.refreshLobbies();

        this.lobbySignalr.observableLobbies.subscribe((data: GameLobby[]) => {
            this.lobbies = data;
            this.isLoaded = true;
        });
    }

    async ngOnInit() {
        await this.lobbySignalr.setup();
        
        this.refreshLobbies();
    }
    
    refreshLobbies(): void {
        this.lobbySignalr.refreshLobbies();
    }

    async createLobby(): Promise<void> {
        const lobby = await this.lobbySignalr.createLobby();

        if(!lobby) return;

        this.joinLobby(lobby.guid);
    }
    
    async joinLobby(lobbyGuid: string): Promise<void> {
        var player = this.playerService.loggedInAs.getValue();

        const result = await this.lobbySignalr.joinLobby(lobbyGuid, player?.guid!);

        if(!result) return;

        this.router.navigate(['lobby', lobbyGuid, this.playerService.loggedInAs.getValue()!.username]);
    }    
}
