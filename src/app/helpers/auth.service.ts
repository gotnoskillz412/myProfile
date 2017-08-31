import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

    constructor() {
    }

    getTokenKey () {
        return `myprofile_${environment.tokenKey}_auth_token`;
    }

    getExpirationKey () {
        return `myprofile_${environment.tokenKey}_expiration`;
    }

    loggedIn() {
        let token = localStorage.getItem(this.getTokenKey());
        let expiration = localStorage.getItem(this.getExpirationKey());
        let now = new Date().getTime();

        if (token && expiration && parseInt(expiration, 10) && parseInt(expiration, 10) > now) {
            return true;
        } else {
            localStorage.removeItem(this.getTokenKey());
            localStorage.removeItem(this.getExpirationKey());
            return false;
        }
    };

    getToken() {
        return localStorage.getItem(this.getTokenKey());
    }

    setToken(token: string) {
        let oneHourFromNow = new Date().getTime() + (1000 * 3600);
        localStorage.setItem(this.getTokenKey(), token);
        localStorage.setItem(this.getExpirationKey(), oneHourFromNow.toString());
    }

    removeToken() {
        localStorage.removeItem(this.getTokenKey());
        localStorage.removeItem(this.getExpirationKey());
    }
}
