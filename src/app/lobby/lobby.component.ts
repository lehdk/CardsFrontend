import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    lobbyId: string | null = null;
    username: string | null = null;

    constructor(private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.lobbyId = params.get("lobbyid");
            this.username = params.get("username");

            if(!this.lobbyId || !this.username) this.router.navigate(['']);
        });
    }
}
