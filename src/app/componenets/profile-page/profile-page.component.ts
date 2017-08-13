import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {ProfilePictureModalComponent} from "../profile-picture-modal/profile-picture-modal.component";
import {AccountService} from "../../helpers/account.service";
import {ProfilePageService} from "./profile-page.service";

@Component({
    selector: 'sfh-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.less'],
    providers: [ProfilePageService]
})
export class ProfilePageComponent implements OnInit {
    private saving: boolean = false;

    data: any;
    profile;
    infoSection: string = 'aboutMe';

    constructor(private route: ActivatedRoute,
                private dialogService: DialogService,
                private accountService: AccountService,
                private profileService: ProfilePageService) {
        this.data = {};
    }

    updateProfile() {
        this.saving = true;
        this.profileService.updateProfile(this.profile).then((profile) => {
            this.profile = profile;
            this.saving = false;
        }).catch(() => {
            this.saving = false;
        });
    }

    openDialog() {
        this.dialogService.addDialog(ProfilePictureModalComponent, {
            title: 'Add Your Picture',
        })
            .subscribe((data) => {
                if (data) {
                    this.data = data;
                    this.accountService.getProfile().then((profile) => {this.profile = profile});
                }
            });
    }

    addLike(like) {
        if (like.trim().length > 0 && this.profile.likes.indexOf(like.trim()) === -1) {
            this.profile.likes.push(like);
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
