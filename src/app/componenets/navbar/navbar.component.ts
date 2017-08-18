import {Component, OnInit} from '@angular/core';
import {Option22Service} from "../../helpers/option22.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Location} from '@angular/common';
import {AccountService} from "../../helpers/account.service";
import {AuthService} from "../../helpers/auth.service";

@Component({
    selector: 'sfh-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

    constructor(private http: Option22Service, private router: Router, private accountService: AccountService) {
    }

    private logoutUrl = Location.joinWithSlash(environment.baseApi, '/auth/logout');
    profilePicture: string;

    loggedIn() {
        return AuthService.loggedIn();
    }

    logout() {
        this.http.get(this.logoutUrl).toPromise().then(() => {
            this.accountService.logout();
            AuthService.removeToken();
            this.accountService.updateProfilePicture(null);
            this.router.navigate(['/home']);
        });
    }

    ngOnInit() {
        this.accountService.subscribeToProfilePictureUpdate((profilePicture) => {
            this.profilePicture = profilePicture;
        });
        this.accountService.getProfile().then((profile) => {
            this.profilePicture = profile.picture;
        });
    }

}
