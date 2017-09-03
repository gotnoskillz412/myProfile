import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";

import {AccountService} from "../../helpers/account.service";
import {AuthService} from "../../helpers/auth.service";
import {environment} from "../../../environments/environment";
import {Option22Service} from "../../helpers/option22.service";

@Component({
    selector: 'sfh-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

    constructor(private http: Option22Service, private router: Router, private accountService: AccountService, private authService: AuthService) {
    }

    private logoutUrl = Location.joinWithSlash(environment.baseApi, '/auth/logout');
    profilePicture: string;

    loggedIn() {
        return this.authService.loggedIn();
    }

    logout() {
        this.http.get(this.logoutUrl).toPromise().then(() => {
            this.accountService.logout();
            this.authService.removeToken();
            this.accountService.updateProfilePicture(null);
            this.router.navigate(['/home']);
        });
    }

    ngOnInit() {
        if (this.loggedIn()) {
            this.accountService.getProfile().then((profile) => {
                this.profilePicture = profile.picture;
            });
        }
        this.accountService.subscribeToProfilePictureUpdate((profilePicture: string) => {
            this.profilePicture = profilePicture;
        });
    }

}
