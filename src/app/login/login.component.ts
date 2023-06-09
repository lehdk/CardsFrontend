import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isReady: boolean = false;
    
    userInfoFormGroup: FormGroup = new FormGroup({
        username: new FormControl('')
    });

    constructor(private router: Router, private playerService: PlayerService) { }

    async ngOnInit(): Promise<void> {
        while(!this.isReady) {
            const result = await this.playerService.setup();
            
            if(!result) continue;
            this.isReady = result === HubConnectionState.Connected;
        }

        await this.tryLogin();
    }

    private async tryLogin() {
        try {
            const wasLoggedIn: boolean = await this.playerService.login();
            
            if(wasLoggedIn) {
                this.router.navigate(["lobbies"]);
            }
        } catch(err) {
            console.log("Could not login", err);
        }
    }

    async login(): Promise<void> {
        const username: string = this.userInfoFormGroup.value.username;
        
        if(!username || username.length < 2) return;

        const wasLoggedIn: boolean = await this.playerService.login(username);
        
        if(wasLoggedIn) {
            this.router.navigate(["lobbies"]);
        }
    }
}
