import { Component, OnInit } from '@angular/core';
import {AppHttpService} from "../../app-http.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../helpers/auth.service";
import {Location} from '@angular/common';
import {AppHelpersService} from "../../app-helpers.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private http: AppHttpService, private router: Router, private appHelpersService: AppHelpersService) { }

  private logoutUrl = Location.joinWithSlash(environment.baseApi, `/auth/logout`);
  profilePicture: string;

  loggedIn() {
    return AuthService.loggedIn();
  }

  logout() {
    this.http.get(this.logoutUrl).toPromise().then(() => {
      localStorage.removeItem('myprofile_auth_token');
      this.router.navigate(['/home']);
    });
  }

  ngOnInit(){
    this.appHelpersService.subscribeToProfilePictureUpdate((profilePicture) => {
      this.profilePicture = profilePicture;
    });
  }

}
