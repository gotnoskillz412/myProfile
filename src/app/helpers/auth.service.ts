import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {
    }

    public static loggedIn() {
        return !!localStorage.getItem('myprofile_auth_token');
    };

    public static setToken(token) {
        localStorage.setItem('myprofile_auth_token', token);
    }
}
