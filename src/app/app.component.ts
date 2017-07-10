import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {environment} from "../environments/environment";
import {AppHttpService} from "./app-http.service";
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";
import {AuthService} from "./helpers/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {

  constructor(private http: AppHttpService, private router: Router) {}

  private logoutUrl = Location.joinWithSlash(environment.baseApi, `/auth/logout`);

  loggedIn() {
    return AuthService.loggedIn();
  }

  logout() {
    this.http.get(this.logoutUrl).toPromise().then(() => {
      localStorage.removeItem('myprofile_auth_token');
      this.router.navigate(['/home']);
    });
  }
}
