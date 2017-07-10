import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public static loggedIn() {
    return !!localStorage.getItem('myprofile_auth_token');
  };
}
