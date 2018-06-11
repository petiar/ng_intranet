import {User} from 'firebase';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {shareReplay, tap} from 'rxjs/internal/operators';
import * as moment from 'moment';
import {JwtService} from './jwt.service';

@Injectable()
export class OAuthService {
    private payload;

    constructor(private http: HttpClient,
                private jwtService: JwtService) {
        if (this.isLoggedIn()) {
            this.payload = jwtService.parseJwt(localStorage.getItem('id_token'));
        }
        console.log('oauth service contructor');
    }

    login (username: string, password: string) {
        const api_url = environment.oauth.api_url;
        console.log('About to call the API...');
        const body = {
            'grant_type': environment.oauth.grant_type,
            'client_id': environment.oauth.client_id,
            'client_secret': environment.oauth.client_secret,
            'username': username,
            'password': password,
            'scope': ''
        };
        const myFormData = this.getFormData(body);
        return this.http.post<User>(api_url, myFormData).pipe(
            tap(
                res => this.setSession(res),
                error => console.log('Something went wrong: ' + error)),
            shareReplay()
        );
    }

    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    private setSession(oauthResult) {
        const expiresAt = moment().add(oauthResult.expires_in, 'seconds');

        localStorage.setItem('id_token', oauthResult.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        this.payload = this.jwtService.parseJwt(oauthResult.access_token);
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    getPayload() {
        return this.payload;
    }

    getId() {
        return this.payload.sub;
    }
}