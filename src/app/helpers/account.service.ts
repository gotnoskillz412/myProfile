import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Account} from '../models/account';
import {Profile} from "../models/profile";
import {Option22Service} from "./option22.service";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable()
export class AccountService {
    private profilePictureUpdateCallbacks: Function[] = [];
    private profilePicture: string;
    private account: Account;
    private profile: Profile;

    constructor(private http: Option22Service) {
    }

    subscribeToProfilePictureUpdate(callback) {
        this.profilePictureUpdateCallbacks.push(callback);
    }

    updateProfilePicture(profilePicture) {
        this.profilePicture = profilePicture;
        this.profilePictureUpdateCallbacks.forEach((cb) => {
            cb(this.profilePicture);
        });
    }

    setAccount(account) {
        this.account = account;
    }

    getAccount(): Promise<Account> {
        if (!this.account || !AuthService.loggedIn()) {
            return this.http.get(Location.joinWithSlash(environment.baseApi, 'auth/account')).toPromise()
                .then((response) => {
                    if (response) {
                        this.setAccount(response.json().account);
                        this.setProfile(response.json().profile);
                        return this.account;
                    }
                });
        }
        return Promise.resolve(this.account);
    }

    setProfile(profile) {
        this.profile = profile;
        this.updateProfilePicture(profile.picture);
    }

    getProfile(): Promise<Profile> {
        if (!this.profile || !AuthService.loggedIn()) {
            return this.http.get(Location.joinWithSlash(environment.baseApi, 'auth/account')).toPromise()
                .then((response) => {
                    if (response) {
                        this.setAccount(response.json().account);
                        this.setProfile(response.json().profile);
                        return this.profile;
                    }
                });
        }
        return Promise.resolve(this.profile);
    }
}
