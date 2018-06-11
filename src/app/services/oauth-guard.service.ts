import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from './oauth.service';
import {Observable} from 'rxjs';

@Injectable()
export class OAuthGuardService implements CanActivate {

    constructor(private oauthService: OAuthService,
                private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.oauthService.isLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }
}