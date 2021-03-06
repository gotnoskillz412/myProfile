import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {Account} from '../models/account';
import {environment} from "../../environments/environment";
import {Option22Service} from "./option22.service";
import {Profile} from "../models/profile";

@Injectable()
export class AccountService {
    private profilePictureUpdateCallbacks: Function[] = [];
    private profilePicture: string;
    private account: Account;

    constructor(private http: Option22Service) {
    }

    subscribeToProfilePictureUpdate(callback: Function) {
        this.profilePictureUpdateCallbacks.push(callback);
    }

    updateProfilePicture(profilePicture: string) {
        this.profilePicture = profilePicture;
        this.profilePictureUpdateCallbacks.forEach((cb) => {
            cb(this.profilePicture);
        });
    }

    getAccount(): Promise<Account> {
        return this.http.get(Location.joinWithSlash(environment.baseApi, 'auth/account')).toPromise()
            .then((response) => {
                if (response) {
                    return response.json().account;
                }
            });
    }

    getProfile(): Promise<Profile> {
        return this.http.get(Location.joinWithSlash(environment.baseApi, 'auth/account')).toPromise()
            .then((response) => {
                if (response) {
                    return response.json().profile;
                } else {
                    return null;
                }
            });
    }

    logout() {
    }
}
