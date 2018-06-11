import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {OAuthService} from './services/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public authService: AuthService,
              public oauthService: OAuthService,
              private router: Router) {
      console.log('App constructor');

      if (oauthService.isLoggedOut()) {
          router.navigate(['login']);
      }
  }
}
