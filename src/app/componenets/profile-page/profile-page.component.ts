import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {ProfilePictureModalComponent} from "../profile-picture-modal/profile-picture-modal.component";
import {AppHelpersService} from "../../app-helpers.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  data: any;
  profile;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private appHelpersService: AppHelpersService) {
    this.data = {};
  }

  openDialog() {
    this.dialogService.addDialog(ProfilePictureModalComponent,{
      title: 'Add Your Picture',
    })
      .subscribe((data) => {
        if (data) {
          this.data = data;
        }
      });
  }

  ngOnInit() {
    this.profile = JSON.parse(this.route.snapshot.data['profile']._body).profile;
    if (this.profile.picture != null) {
      this.data.image = this.profile.picture;
      this.appHelpersService.updateProfilePicture(this.profile.picture);
    }
  }
}
