import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { GameLobby, LobbyStatus } from '../models/GameLobby.model';
import { SignalrLobbyService } from '../services/signalr-lobby.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    public LobbyStatus = LobbyStatus;

    gameLobby: GameLobby | null = null;

    constructor(private router: Router, private route: ActivatedRoute, public playerService: PlayerService, private lobbyService: SignalrLobbyService) { }

    async ngOnInit() {
        await this.playerService.setup();
        await this.playerService.login();
        const player = this.playerService.loggedInAs.getValue();

        if(!player) {
            this.router.navigate([""]);
        }

        this.lobbyService.joinedLobby.subscribe((gameLobby: GameLobby | null) => {
            this.gameLobby = gameLobby;
        });
        
        this.playerService.setup().then(async () => {
            this.route.params.subscribe(async (params: Params) => {         
                const lobbyId = params["lobbyId"];
                
                if(!lobbyId || lobbyId !== player!.joinedLobbyGuid) {
                    this.router.navigate([""]);
                }

                this.lobbyService.refreshJoinedLobby(lobbyId);
            });
        });
    }

    async leaveLobby() {
        let player = this.playerService.loggedInAs.getValue();

        if(player) {
            await this.lobbyService.leaveLobby(player.guid);
        }

        this.router.navigate(["lobbies"]);
    }

    kickPlayer(player: Player): void {
        const loggedInAs = this.playerService.loggedInAs.getValue();
        if(!loggedInAs) return;

        if(player.guid !== loggedInAs.guid) return; // Can not kick self

        console.log("Kick");
    }

    async lockToggle(): Promise<void> {
        
        //TODO: Make this call the backend

        if(!this.gameLobby) return;

        switch(this.gameLobby.status) {
            case LobbyStatus.Open: {
                this.gameLobby.status = LobbyStatus.Locked;
                break;
            }
            case LobbyStatus.Locked: {
                this.gameLobby.status = LobbyStatus.Open;
                break;
            }
        }
    }
}
