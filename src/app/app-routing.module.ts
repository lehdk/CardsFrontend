import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyOverviewComponent } from './lobby-overview/lobby-overview.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "lobbies", component: LobbyOverviewComponent },
    { path: "lobby/:lobbyId", component: LobbyComponent },
    { path: "lobby", redirectTo: "/lobbies" },
    { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
