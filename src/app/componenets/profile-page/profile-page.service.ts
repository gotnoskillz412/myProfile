import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import 'rxjs/add/operator/toPromise';
import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";
import {AccountService} from "../../helpers/account.service";


@Injectable()
export class ProfilePageService {

    constructor(private http: Option22Service, private helpersService: HelpersService, private accountService: AccountService){
    }

    updateProfile(profile) {
        return this.helpersService.getAuthUri().then((url) => {
            return this.http.put(Location.joinWithSlash(url, `profiles/${profile._id}`), profile).toPromise().then((response) => {
                this.accountService.updateProfilePicture(response.json().picture);
                return response.json();
            });
        });
    }

}
