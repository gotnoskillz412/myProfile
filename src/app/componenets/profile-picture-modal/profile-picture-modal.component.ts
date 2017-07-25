import {Component, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ModalDirective} from "ngx-bootstrap";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {environment} from "../../../environments/environment";
import {AppHttpService} from "../../app-http.service";
import {AppHelpersService} from "../../app-helpers.service";

export interface ConfirmModel {
  title: string;
  image: any
}

@Component({
  selector: 'app-profile-picture-modal',
  templateUrl: './profile-picture-modal.component.html',
  styleUrls: ['./profile-picture-modal.component.less']
})
export class ProfilePictureModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  private profilePictureUrl = Location.joinWithSlash(environment.baseApi, 'profile/picture');

  title: string;
  image: HTMLImageElement;
  data;

  profileCropperSettings: CropperSettings;
  @ViewChild('profileCropper', undefined)
  profileCropper: ImageCropperComponent;
  @ViewChild('profileEditorModal') profileEditorModal: ModalDirective;

  constructor(dialogService: DialogService, private http: AppHttpService, private appHelpersService: AppHelpersService) {
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

  fileChangeListener($event) {
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
    this.http.post(this.profilePictureUrl, {image: this.data.image}).toPromise().then(() => {
      this.appHelpersService.updateProfilePicture(this.data.image);
      this.result = this.data;
      this.close();
    });
  }
}
