import {Component, OnInit} from '@angular/core';

import {HomePageService} from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.sass'],
  providers: [HomePageService]
})
export class HomePageComponent implements OnInit {

  private showPicture: Boolean = false;
  private loaded: Boolean = false;

  constructor(private homePageService: HomePageService) {
  }

  ngOnInit() {
    this.homePageService.testCredentials().then(response => {
      this.loaded = true;
    })
      .catch(error => {
        console.log(error);
      });
  }

  private toggleButton = function () {
    this.showPicture = true;
  }
}
