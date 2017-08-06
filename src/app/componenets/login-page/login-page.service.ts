import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Headers, RequestOptions} from '@angular/http';
import {Option22Service} from '../../helpers/option22.service';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";

@Injectable()
export class LoginPageService {
    private loginUrl = Location.joinWithSlash(environment.baseApi, 'auth/login');

    constructor(private http: Option22Service) {
    }

    sendLoginCredentials(creds): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let body = `username=${creds.username}&password=${creds.password}`;

        return this.http.post(this.loginUrl, body, options).toPromise();
    }

}
