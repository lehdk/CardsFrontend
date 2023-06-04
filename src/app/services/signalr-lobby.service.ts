import { Injectable } from '@angular/core';
import { GameLobby } from '../models/GameLobby.model';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrLobbyService {
    
    public observableLobbies: BehaviorSubject<GameLobby[]> = new BehaviorSubject<GameLobby[]>([]);

    public joinedLobby = new BehaviorSubject<GameLobby | null>(null);

    private hubConnection: HubConnection | null = null;

    public async setup() {

        if(this.hubConnection && this.hubConnection.state !== HubConnectionState.Disconnected) return null;
        
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

        this.hubConnection.on("GroupLobbyPlayersChanged", (data: Player[]) => {
            let lobby: GameLobby | null = this.joinedLobby.getValue();
            
            if(!lobby) return;

            lobby.players = data;

            this.joinedLobby.next(lobby);
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
    
    public async joinLobby(lobbyId: string, playerGuid: string) {
        if(!this.hubConnection) return null;
        
        const lobby: GameLobby | null = await this.hubConnection.invoke<GameLobby | null>("JoinLobby", lobbyId, playerGuid);
    
        if(lobby) {
            this.joinedLobby.next(lobby);
        }

        return lobby;
    }
    
    public async refreshJoinedLobby(lobbyId: string) {
        if(!this.hubConnection) await this.setup();
        
        const lobby: GameLobby | null = await this.hubConnection!.invoke<GameLobby | null>("GetGameLobby", lobbyId);
        
        this.joinedLobby.next(lobby);
    }
    
    public async leaveLobby(playerId: string) {
        if(!this.hubConnection) await this.setup();

        const lobby =  this.joinedLobby.getValue();
        if(!lobby) return;

        await this.hubConnection!.send("LeaveLobby", lobby.guid, playerId);
        this.joinedLobby.next(null);
    }
}
