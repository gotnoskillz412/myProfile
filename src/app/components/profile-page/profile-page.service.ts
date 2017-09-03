import {Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {Account} from "../../models/account";
import {AccountService} from "../../helpers/account.service";
import {AuthService} from "../../helpers/auth.service";
import {environment} from "../../../environments/environment";
import {HelpersService} from "../../helpers/helpers.service";
import {Option22Service} from "../../helpers/option22.service";
import {Profile} from "../../models/profile";


@Injectable()
export class ProfilePageService {

    constructor(private http: Option22Service,
                private helpersService: HelpersService,
                private accountService: AccountService,
                private authService: AuthService){
    }

    updateProfile(profile: Profile): Promise<Profile> {
        return this.helpersService.getAuthUri().then((url) => {
            return this.http.put(Location.joinWithSlash(url, `profiles/${profile._id}`), profile).toPromise().then((response) => {
                let profile: Profile = response.json();
                this.accountService.updateProfilePicture(response.json().picture);
                return profile;
            });
        });
    }

    updatePassword(passwords: any, accountId: string): Promise<Account> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let body = `currentPassword=${passwords.currentPassword}&newPassword=${passwords.newPassword}`;
        return this.http.put(Location.joinWithSlash(environment.baseApi, `/auth/account/${accountId}/password`), body, options).toPromise().then((response) => {
            this.authService.setToken(response.json().token);
            return response.json().account as Account;
        });
    }

    updateAccount(account: Account): Promise<Account> {
        return this.http.put(Location.joinWithSlash(environment.baseApi, `/auth/account/${account._id}/update`), account).toPromise().then((response) => {
            this.authService.setToken(response.json().token);
            return response.json().account as Account;
        })
    }

}
