import { Injectable } from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {AppHttpService} from '../../app-http.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginPageService {
  private loginUrl = 'http://localhost:3000/auth/login';

  constructor(private http: AppHttpService) {}

  sendLoginCredentials(creds): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = `username=${creds.username}&password=${creds.password}`;

    return this.http.post(this.loginUrl, body, options).toPromise();
  }

}
