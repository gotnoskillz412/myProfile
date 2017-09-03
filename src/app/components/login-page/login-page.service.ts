import {Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from "../../helpers/auth.service";
import {environment} from "../../../environments/environment";
import {Option22Service} from '../../helpers/option22.service';

@Injectable()
export class LoginPageService {
    private loginUrl = Location.joinWithSlash(environment.baseApi, 'auth/login');

    constructor(private http: Option22Service, private authService: AuthService) {
    }

    sendLoginCredentials(creds: any): Promise<any> {
        if (this.authService.loggedIn()) {
            this.authService.removeToken();
        }
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let body = `username=${creds.username}&password=${creds.password}`;

        return this.http.post(this.loginUrl, body, options).toPromise().then((response) => {
            this.authService.setToken(response.json().token);
            return response;
        });
    }

}
