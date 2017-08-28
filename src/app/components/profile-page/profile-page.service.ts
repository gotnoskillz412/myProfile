import {Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";
import {AccountService} from "../../helpers/account.service";
import {Profile} from "../../models/profile";
import {Account} from "../../models/account";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../helpers/auth.service";


@Injectable()
export class ProfilePageService {

    constructor(private http: Option22Service, private helpersService: HelpersService, private accountService: AccountService){
    }

    updateProfile(profile): Promise<Profile> {
        return this.helpersService.getAuthUri().then((url) => {
            return this.http.put(Location.joinWithSlash(url, `profiles/${profile._id}`), profile).toPromise().then((response) => {
                let profile: Profile = response.json();
                this.accountService.updateProfilePicture(response.json().picture);
                return profile;
            });
        });
    }

    updatePassword(passwords, accountId): Promise<Account> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let body = `currentPassword=${passwords.currentPassword}&newPassword=${passwords.newPassword}`;
        return this.http.put(Location.joinWithSlash(environment.baseApi, `/auth/account/${accountId}/password`), body, options).toPromise().then((response) => {
            AuthService.setToken(response.json().token);
            return response.json().account as Account;
        });
    }

    updateAccount(account): Promise<Account> {
        return this.http.put(Location.joinWithSlash(environment.baseApi, `/auth/account/${account._id}/update`), account).toPromise().then((response) => {
            AuthService.setToken(response.json().token);
            return response.json().account as Account;
        })
    }

}
