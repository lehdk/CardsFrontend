import { Pipe, PipeTransform } from "@angular/core";
import { Player } from "./player.model";

export enum LobbyStatus {
    Open,
    Locked,
    Started
}

@Pipe({
    name: 'lobbyStatusToString',
})
export class LobbyStatusToString implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return LobbyStatus[value];
    }
};

export interface GameLobby {
    guid: string;

    players?: Player[];

    status: LobbyStatus;
}