import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

    constructor() {
    }

    public static getTokenKey () {
        return `myprofile_${environment.tokenKey}_auth_token`;
    }

    public static getExpirationKey () {
        return `myprofile_${environment.tokenKey}_expiration`;
    }

    public static loggedIn() {
        let token = localStorage.getItem(AuthService.getTokenKey());
        let expiration = localStorage.getItem(AuthService.getExpirationKey());
        let now = new Date().getTime();

        if (token && expiration && parseInt(expiration, 10) && parseInt(expiration, 10) > now) {
            return true;
        } else {
            localStorage.removeItem(AuthService.getTokenKey());
            localStorage.removeItem(AuthService.getExpirationKey());
            return false;
        }
    };

    public static getToken() {
        return localStorage.getItem(AuthService.getTokenKey());
    }

    public static setToken(token: string) {
        let oneHourFromNow = new Date().getTime() + (1000 * 3600);
        localStorage.setItem(AuthService.getTokenKey(), token);
        localStorage.setItem(AuthService.getExpirationKey(), oneHourFromNow.toString());
    }

    public static removeToken() {
        localStorage.removeItem(AuthService.getTokenKey());
        localStorage.removeItem(AuthService.getExpirationKey());
    }
}
