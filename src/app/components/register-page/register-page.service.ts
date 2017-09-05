import {Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from "../../helpers/auth.service";
import {environment} from "../../../environments/environment";
import {Option22Service} from '../../helpers/option22.service';

@Injectable()
export class RegisterPageService {
    private registerUrl = Location.joinWithSlash(environment.baseApi, 'auth/register');

    constructor(private http: Option22Service, private authService: AuthService) {}

    registerAccount(accountInfo: any): Promise<any> {
        if (this.authService.loggedIn()) {
            this.authService.removeToken();
        }
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let body = `username=${accountInfo.username}&email=${accountInfo.email}&password=${accountInfo.password}&firstName=${accountInfo.firstName}&lastName=${accountInfo.lastName}`;
        return this.http.post(this.registerUrl, body, options).toPromise().then((response) => {
            this.authService.setToken(response.json().token);
            return response;
        }).catch((err) => {
            return Promise.reject(err);
        });
    }

}
