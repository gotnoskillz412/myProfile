import {Component, OnInit} from '@angular/core';

import {HomePageService} from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.sass'],
  providers: [HomePageService]
})
export class HomePageComponent implements OnInit {

  constructor(private homePageService: HomePageService) {
  }

  ngOnInit() {
    this.homePageService.testCredentials().then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
  }

}
