import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {ProfilePictureModalComponent} from "../profile-picture-modal/profile-picture-modal.component";
import {AccountService} from "../../helpers/account.service";

@Component({
    selector: 'sfh-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
    data: any;
    profile;

    constructor(private route: ActivatedRoute, private dialogService: DialogService, private accountService: AccountService) {
        this.data = {};
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

    ngOnInit() {
        this.profile = this.route.snapshot.data['profile'];
        if (this.profile.picture != null) {
            this.data.image = this.profile.picture;
            this.accountService.updateProfilePicture(this.profile.picture);
        }
    }
}
