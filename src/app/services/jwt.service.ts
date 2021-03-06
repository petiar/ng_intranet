import {Injectable} from '@angular/core';

@Injectable()
export class JwtService {
    constructor() {}

    parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}