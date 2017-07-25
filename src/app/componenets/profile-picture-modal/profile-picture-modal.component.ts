import {Component, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ModalDirective} from "ngx-bootstrap";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../environments/environment";

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
  private token = localStorage.getItem('myprofile_auth_token');

  title: string;
  image: HTMLImageElement;
  data;

  uploader: FileUploader = new FileUploader({
    url: this.profilePictureUrl,
    headers: [{name: 'authorization', value: `Bearer ${this.token}`}]
  });

  profileCropperSettings: CropperSettings;
  @ViewChild('profileCropper', undefined)
  profileCropper: ImageCropperComponent;
  @ViewChild('profileEditorModal') profileEditorModal: ModalDirective;

  constructor(dialogService: DialogService) {
    super(dialogService);
    this.profileCropperSettings = new CropperSettings();
    this.profileCropperSettings.width = 300;
    this.profileCropperSettings.height = 300;
    this.profileCropperSettings.croppedWidth = 200;
    this.profileCropperSettings.croppedHeight = 200;
    this.profileCropperSettings.canvasWidth = 400;
    this.profileCropperSettings.canvasHeight = 400;
    this.profileCropperSettings.noFileInput = true;
    this.profileCropperSettings.rounded = true;
    this.data = {};

    this.uploader.onAfterAddingFile = (f) => {
      this.image = new Image();
      let file: File = f._file;
      let fileReader: FileReader = new FileReader();
      fileReader.onloadend = (loadEvent: any) => {
        console.log(loadEvent);
        this.image.src = loadEvent.target.result;
        this.profileCropper.setImage(this.image);
      };
      fileReader.readAsDataURL(file);
    }
  }


  confirm() {
    this.uploader.uploadItem(this.data);
    this.result = this.data;
    this.close();
  }
}
