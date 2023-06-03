import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from './services/player.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

    constructor(private router: Router, private playerService: PlayerService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
            Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if(this.playerService.loggedInAs.getValue()) {
            return true;
        } else {
            this.router.navigate([""]);
            return false;
        }
    }
}
