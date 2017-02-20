import { Component, OnInit } from '@angular/core';
import {ProfilePageService} from "./profile-page.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  providers:[ProfilePageService]
})
export class ProfilePageComponent implements OnInit {
  private loaded: boolean = false;
  constructor(private service: ProfilePageService) { }

  ngOnInit() {
    this.service.testCredentials().then(() => {
      this.loaded = true;
    });
  }

}
