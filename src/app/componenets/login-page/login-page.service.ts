import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import {HttpServiceService} from '../../http-service.service';

@Injectable()
export class LoginPageService {
  private loginUrl = '/auth/login';

  constructor(private http: HttpServiceService) {}

  sendLoginCredentials(creds): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = `username=${creds.username}&password=${creds.password}`;

    return this.http.post(this.loginUrl, body, headers);
  }

}
