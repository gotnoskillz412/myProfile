import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from 'ng2-bootstrap-modal';
import {ProfilePictureModalComponent} from './profile-picture-modal/profile-picture-modal.component';
import {AccountService} from '../../helpers/account.service';
import {ProfilePageService} from './profile-page.service';
import {Profile} from '../../models/profile';
import {Account} from '../../models/account';
import {PasswordUpdateModalComponent} from "./password-update-modal/password-update-modal.component";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
    selector: 'sfh-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.less'],
    providers: [ProfilePageService]
})
export class ProfilePageComponent implements OnInit {
    private saving: boolean = false;

    data: any;
    account: Account;
    profile: Profile;
    sections = {
        aboutMe: 'aboutMe',
        security: 'security'
    };
    infoSection: string = this.sections.aboutMe;

    constructor(private route: ActivatedRoute,
                private dialogService: DialogService,
                private accountService: AccountService,
                private notifications: NotificationsService,
                private profileService: ProfilePageService) {
        this.data = {};
    }

    updateProfile() {
        if (!this.saving) {
            this.saving = true;
            this.profileService.updateProfile(this.profile).then((profile) => {
                this.profile = profile;
                this.saving = false;
                this.notifications.success('Updated', 'Profile Updated Successfully');
            }).catch(() => {
                this.saving = false;
            });
        }
    }

    updateAccount() {
        if (!this.saving) {
            this.saving = true;
            this.profileService.updateAccount(this.account).then((account) => {
                this.account = account;
                this.saving = false;
                this.notifications.success('Updated', 'Account Updated Successfully');
            }).catch(() => {
                this.saving = false;
            });
        }
    }

    openDialog() {
        this.dialogService.addDialog(ProfilePictureModalComponent, {
            title: 'Add Your Picture'
        })
            .subscribe((data) => {
                if (data) {
                    this.data = data;
                    this.accountService.getProfile().then((profile) => {
                        this.profile = profile;
                        this.notifications.success('Updated', 'Profile Picture Updated Successfully');
                    });
                }
            });
    }

    openPasswordModal() {
        this.dialogService.addDialog(PasswordUpdateModalComponent, {
            title: 'Update Your Password',
            account: this.account
        })
            .subscribe((account) => {
                if (account) {
                    this.account = account;
                    this.notifications.success('Updated', 'Password Updated Successfully');
                }
            });
    }

    addLike(like) {
        if (like.trim().length > 0 && this.profile.likes.indexOf(like.trim()) === -1) {
            this.profile.likes.push(like);
        }
    }

    loadSecurityInfo() {
        if (this.infoSection !== this.sections.security){
            this.accountService.getAccount().then((response) => {
                this.account = response;
                this.infoSection = this.sections.security;
            });
        }
    }

    loadAboutMeInfo() {
        if (this.infoSection !== this.sections.aboutMe) {
            this.accountService.getProfile().then((response) => {
                this.profile = response;
                this.infoSection = this.sections.aboutMe;
            });
        }
    }

    removeLike() {
        return (index) => {
            if (this.profile && Array.isArray(this.profile.likes) && this.profile.likes[index] != null){
                this.profile.likes.splice(index, 1);
            }
        }
    }

    ngOnInit() {
        this.profile = this.route.snapshot.data['profile'];
        if (this.profile.picture != null) {
            this.data.image = this.profile.picture;
            this.accountService.updateProfilePicture(this.profile.picture);
        }
    }
}
