import { Injectable } from '@angular/core';
import {Headers, Response} from '@angular/http';
import {HttpServiceService} from '../../http-service.service';

@Injectable()
export class RegisterPageService {
  private registerUrl = '/auth/register';
  constructor(private http: HttpServiceService) {

  }

  registerAccount (accountInfo) : Promise<any> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = `username=${accountInfo.username}&email=${accountInfo.email}&password=${accountInfo.password}`;
    return this.http.post(this.registerUrl, body, headers);
  }

}
