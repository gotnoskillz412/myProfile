import {Component, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ModalDirective} from 'ngx-bootstrap';

import {AccountService} from '../../../helpers/account.service';
import {HelpersService} from '../../../helpers/helpers.service';
import {Option22Service} from '../../../helpers/option22.service';
import {Profile} from "../../../models/profile";

export interface ConfirmModel {
    title: string;
    image: any
}

@Component({
    selector: 'sfh-profile-picture-modal',
    templateUrl: './profile-picture-modal.component.html',
    styleUrls: ['./profile-picture-modal.component.less']
})
export class ProfilePictureModalComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    title: string;
    image: HTMLImageElement;
    data: any;
    profile: Profile;

    profileCropperSettings: CropperSettings;
    @ViewChild('profileCropper', undefined)
    profileCropper: ImageCropperComponent;
    @ViewChild('profileEditorModal')
    profileEditorModal: ModalDirective;

    constructor(dialogService: DialogService, private http: Option22Service, private accountService: AccountService, private helpersService: HelpersService) {
        super(dialogService);
        this.profileCropperSettings = new CropperSettings();
        this.profileCropperSettings.width = 300;
        this.profileCropperSettings.height = 300;
        this.profileCropperSettings.croppedWidth = 200;
        this.profileCropperSettings.croppedHeight = 200;
        this.profileCropperSettings.canvasWidth = 350;
        this.profileCropperSettings.canvasHeight = 350;
        this.profileCropperSettings.noFileInput = true;
        this.profileCropperSettings.rounded = true;
        this.data = {};
    }

    fileChangeListener($event: any) {
        this.image = new Image();
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            this.image.src = loadEvent.target.result;
            this.profileCropper.setImage(this.image);

        };

        myReader.readAsDataURL(file);
    }


    confirm() {
        this.accountService.getProfile()
            .then((profile) => {
                this.profile = profile;
                profile.picture = this.data.image;
                return this.helpersService.getAuthUri();
            })
            .then((authUri) => {
                let profileUpdateUri = Location.joinWithSlash(authUri, `profiles/${this.profile._id}`);
                this.http.put(profileUpdateUri, this.profile).toPromise().then((response) => {
                    this.accountService.updateProfilePicture(response.json().picture);
                    this.result = this.data;
                    this.close();
                });
            });
    }

}
