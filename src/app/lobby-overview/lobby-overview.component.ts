import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { GameLobby } from '../models/GameLobby.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby-overview',
  templateUrl: './lobby-overview.component.html',
  styleUrls: ['./lobby-overview.component.scss']
})
export class LobbyOverviewComponent {

    username: string = "";
    
    lobbies: GameLobby[] = [];

    constructor(private backend: BackendService, private router: Router) {
        this.refreshLobbies();
    }
    
    refreshLobbies(): void {
        this.backend.getLobbies().subscribe((data: GameLobby[]) => {
            this.lobbies = data;
        });
    }

    createLobby(): void {
        this.backend.createLobby().subscribe((guid: string) => {
            const lobby: GameLobby = {
                guid: guid
            };

            this.lobbies.push(lobby)
        });
    }
    
    joinLobby(lobbyGuid: string): void {
        if(this.username.length < 2) return;
        
        this.router.navigate(['lobby', lobbyGuid, this.username]);
    }
}
