import { Player } from "./player.model";

export interface GameLobby {
    guid: string;

    players?: Player[];
}