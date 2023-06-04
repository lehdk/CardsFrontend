import { GameLobby } from "./GameLobby.model";

export interface Player {
    guid: string;
    username: string;
    joinedLobbyGuid: string | null;
}