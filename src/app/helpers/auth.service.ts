import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {
    }

    public static loggedIn() {
        let token = localStorage.getItem('myprofile_auth_token');
        let expiration = localStorage.getItem('myprofile_expiration');
        let now = new Date().getTime();

        if (token && expiration && parseInt(expiration, 10) && parseInt(expiration, 10) > now) {
            return true;
        } else {
            localStorage.removeItem('myprofile_auth_token');
            localStorage.removeItem('myprofile_expiration');
            return false;
        }
    };

    public static getToken() {
        return localStorage.getItem('myprofile_auth_token');
    }

    public static setToken(token) {
        let oneHourFromNow = new Date().getTime() + (1000 * 3600);
        localStorage.setItem('myprofile_auth_token', token);
        localStorage.setItem('myprofile_expiration', oneHourFromNow.toString());
    }

    public static removeToken() {
        localStorage.removeItem('myprofile_auth_token');
        localStorage.removeItem('myprofile_expiration');
    }
}
