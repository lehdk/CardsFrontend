import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyOverviewComponent } from './lobby-overview/lobby-overview.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';
import { LoggedinGuard } from './loggedin.guard';

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "lobbies", component: LobbyOverviewComponent, canActivate: [LoggedinGuard]},
    { path: "lobby/:lobbyid/:username", component: LobbyComponent, canActivate: [LoggedinGuard] },
    { path: "lobby", redirectTo: "" },
    { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
