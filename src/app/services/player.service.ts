import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player.model';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private static lsUserInfo: string = "userInfo"; 


    loggedInAs: BehaviorSubject<Player | null> = new BehaviorSubject<Player | null>(null);

    private hubConnection: HubConnection | null = null;

    constructor() { }
    
    public async setup() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5138/Player")
            .build();

        this.setupListeners();

        return this.hubConnection
            .start()
            .then(() => console.log("Lobby hub connection started"))
            .catch(err => console.log(`Error while starting connection ${err}`)
        );
    }

    private setupListeners(): void {
    }

    async login(username: string | null = null): Promise<boolean> {
        
        let player: Player | null = null;

        if(username === null) { // Try load from localstorage
            const lsResult = localStorage.getItem(PlayerService.lsUserInfo);
            if(!lsResult) return false;

            try {
                let parsed: Player = JSON.parse(lsResult);

                if(!parsed) throw new Error("No data");

                player = parsed;
            } catch {
                localStorage.removeItem(PlayerService.lsUserInfo);
                return false;
            }
        }
        
        let backendResult = await this.hubConnection!.invoke<Player | null>("LoginOrRegister", (username ? username : player!.username), (player ? player.guid : null));

        if(backendResult === null) return false;

        localStorage.setItem(PlayerService.lsUserInfo, JSON.stringify(backendResult));
        this.loggedInAs.next(backendResult);

        return true;
    }
}
