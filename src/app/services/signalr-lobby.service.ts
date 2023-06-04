import { Injectable } from '@angular/core';
import { GameLobby } from '../models/GameLobby.model';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrLobbyService {
    
    public observableLobbies: BehaviorSubject<GameLobby[]> = new BehaviorSubject<GameLobby[]>([]);

    private hubConnection: HubConnection | null = null;

    public async setup() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5138/Lobby")
            .build();

        this.setupListeners();

        return this.hubConnection
            .start()
            .then(() => console.log("Lobby hub connection started"))
            .catch(err => console.log(`Error while starting connection ${err}`)
        );
    }

    private setupListeners() {
        if(!this.hubConnection) {
            console.log("Hub connection was null or undefined while setting up listeners");
            return;
        }

        this.hubConnection.on("LobbyData", (data: GameLobby[]) => {
            this.observableLobbies.next(data);
        });

        this.hubConnection.on("LobbyChanged", (data: GameLobby) => {
            let lobbies: GameLobby[] = this.observableLobbies.getValue();

            const index = lobbies.findIndex(x => x.guid === data.guid);

            lobbies[index] = data;

            this.observableLobbies.next(lobbies);
        });
    }
    
    public createLobby(): Promise<GameLobby> | null {
        if(!this.hubConnection) return null;

        return this.hubConnection.invoke<GameLobby>("CreateLobby");
    }
    
    public refreshLobbies() {
        if(!this.hubConnection) return;
        
        this.hubConnection.invoke("GetLobbies").then((data: GameLobby[]) => {
            this.observableLobbies.next(data);
        });
    }
    
    public joinLobby(lobbyId: string, playerGuid: string): Promise<boolean> | null {
        if(!this.hubConnection) return null;

        return this.hubConnection.invoke<boolean>("JoinLobby", lobbyId, playerGuid);
    }
}
