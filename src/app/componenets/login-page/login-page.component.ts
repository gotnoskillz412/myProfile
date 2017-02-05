import { Component, OnInit } from '@angular/core';

import {LoginPageService} from './login-page.service';
import {HttpServiceService} from '../../http-service.service'

@Component({
  moduleId: module.id,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [LoginPageService, HttpServiceService]
})
export class LoginPageComponent implements OnInit {
  constructor(
    private loginPageService: LoginPageService) {}
    public invalidCredentials: boolean = false;

  ngOnInit() {
  }

  model = {
    username: null,
    password: null
  };

  onSubmit() {
    this.loginPageService.sendLoginCredentials(this.model).then(data => {
      console.log('Responses', data);
    }, loginError => {
      this.invalidCredentials = true;
      console.log('Error', loginError)
    });
  }

}
