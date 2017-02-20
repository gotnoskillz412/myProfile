import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Headers, RequestOptions} from '@angular/http';
import {AppHttpService} from '../../app-http.service';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";

@Injectable()
export class RegisterPageService {
  private registerUrl = Location.joinWithSlash(environment.baseApi, 'auth/register');

  constructor(private http: AppHttpService) {

  }

  registerAccount(accountInfo): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = `username=${accountInfo.username}&email=${accountInfo.email}&password=${accountInfo.password}`;
    return this.http.post(this.registerUrl, body, options).toPromise();
  }

}
