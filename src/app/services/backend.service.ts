import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameLobby } from '../models/GameLobby.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private url = 'http://localhost:5138';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getLobbies(): Observable<GameLobby[]> {
    return this.http.get<GameLobby[]>(this.url + "/Lobby/GetLobbies");
  }

  createLobby(): Observable<string> {
    return this.http.post<string>(this.url + "/Lobby/CreateGameLobby", this.httpOptions);
  }
}
