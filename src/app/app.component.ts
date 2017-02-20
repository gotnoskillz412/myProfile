import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {

  checkLoginStatus() : boolean  {
    return localStorage.getItem('myprofile_auth_token') != null;
  }
}
