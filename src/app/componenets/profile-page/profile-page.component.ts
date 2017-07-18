import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {FileUploader} from 'ng2-file-upload';
import {environment} from "../../../environments/environment";
import {AppHelpersService} from "../../app-helpers.service";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  private profilePictureUrl = Location.joinWithSlash(environment.baseApi, 'profile/picture');
  private token = localStorage.getItem('myprofile_auth_token');

  image: any;
  data: any;
  profile;
  profileCropperSettings: CropperSettings;
  uploader: FileUploader = new FileUploader({
    url: this.profilePictureUrl,
    headers: [{name: 'authorization', value: `Bearer ${this.token}`}]
  });
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;

  @ViewChild('profileCropper', undefined)
  profileCropper: ImageCropperComponent;

  @ViewChild('profileEditorModal') profileEditorModal:ModalDirective;

  constructor(private route: ActivatedRoute, private appHelpersService: AppHelpersService) {
    this.profileCropperSettings = new CropperSettings();
    this.profileCropperSettings = new CropperSettings();
    this.profileCropperSettings.width = 100;
    this.profileCropperSettings.height = 100;
    this.profileCropperSettings.croppedWidth =100;
    this.profileCropperSettings.croppedHeight = 100;
    this.profileCropperSettings.canvasWidth = 400;
    this.profileCropperSettings.canvasHeight = 300;
    this.profileCropperSettings.noFileInput = true;
    this.data = {};
  }

  ngOnInit() {
    this.profile = JSON.parse(this.route.snapshot.data['profile']._body);
    // this.appHelpersService.profilePicture = this.profile.picture || null;
    // this.profilePicture = this.appHelpersService.profilePicture || null;

    this.uploader.onAfterAddingFile = (f) => {
      this.image = new Image();
      let file: File = f._file;
      let fileReader: FileReader = new FileReader();
      fileReader.onloadend = (loadEvent: any) => {
        this.image.src = loadEvent.target.result;
        this.profileCropper.setImage(this.image);
      };
      fileReader.readAsDataURL(file);
    }
  }
}
