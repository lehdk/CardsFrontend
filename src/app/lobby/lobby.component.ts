import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    lobbyId: string = "";

    constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

    async ngOnInit() {
        await this.playerService.setup();
        await this.playerService.login();
        const player = this.playerService.loggedInAs.getValue();

        if(!player) {
            this.router.navigate([""]);
        }
        
        this.playerService.setup().then(() => {
            this.route.params.subscribe((params: Params) => {         
                const lobbyId = params["lobbyId"];
                
                if(!lobbyId || lobbyId !== player!.joinedLobbyGuid) {
                    this.router.navigate([""]);
                }

                this.lobbyId = lobbyId;
            });
        });
    }
}
