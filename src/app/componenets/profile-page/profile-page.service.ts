import {Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";
import {AccountService} from "../../helpers/account.service";
import {Profile} from "../../models/profile";
import {Account} from "../../models/account";


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

    updatePassword(passwords): Promise<Account> {
        return this.helpersService.getAuthUri().then((url) => {
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            let options = new RequestOptions({headers: headers});
            let body = `password=${passwords.currentPassword}&newpassword=${passwords.newPassword}`;
            return this.http.put(Location.joinWithSlash(url, ''), body, options).toPromise().then((response) => {
                return response.json() as Account;
            });
        });
    }

}
