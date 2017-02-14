import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginPageService} from './login-page.service';
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['login-page.component.less'],
  providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
  constructor(private loginPageService: LoginPageService,
              private router: Router) {
  }

  public invalidCredentials: boolean = false;

  ngOnInit() {
  }

  model = {
    username: null,
    password: null
  };

  onSubmit() {
    this.loginPageService.sendLoginCredentials(this.model).then(response => {
      localStorage.setItem('myprofile_auth_token', response.json().token);
      this.router.navigate(['/home']);
    }, loginError => {
      this.invalidCredentials = true;
      console.log('Error', loginError)
    });
  }

}
