import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthService} from '../services/oauth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('f') loginForm: NgForm;
    private error: boolean;
    private errorMsg: string;

  constructor(private oauthService: OAuthService,
              private router: Router) { }

  ngOnInit() {
  }

    login() {
        const val = this.loginForm.value.userData;
        console.log(val);
        if (val.username && val.password) {
            console.log('Logging in...');
            this.oauthService.login(val.username, val.password)
                .subscribe(
                    (data) => {
                        console.log('User is logged in');
                        console.log(data);
                        this.error = false;
                        this.payload = this.oauthService.getPayload();
                    },
                    (error) => {
                        console.log(error);
                        this.error = true;
                        this.errorMsg = error.error.message;
                        this.loginForm.reset();
                    }
                );
        }
    }

    logout() {
        this.oauthService.logout();
        this.router.navigate(['/']);
    }

}
