import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyOverviewComponent } from './lobby-overview/lobby-overview.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
    { path: "", component: LobbyOverviewComponent },
    { path: "lobby/:lobbyid/:username", component: LobbyComponent },
    { path: "lobby", redirectTo: "" },
    { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
