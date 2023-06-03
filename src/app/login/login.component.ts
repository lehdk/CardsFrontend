import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '../models/player.model';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    userInfoFormGroup: FormGroup = new FormGroup({
        username: new FormControl('')
    });

    constructor(private router: Router, private playerService: PlayerService) { }

    async ngOnInit(): Promise<void> {
        await this.playerService.setup();

        const wasLoggedIn: boolean = await this.playerService.login();
        
        if(wasLoggedIn) {
            this.router.navigate(["lobbies"]);
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
