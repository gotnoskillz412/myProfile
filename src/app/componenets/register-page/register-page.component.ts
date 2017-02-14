'use strict';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {RegisterPageService} from './register-page.service';
import {AppHttpService} from "../../app-http.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['register-page.component.less'],
  providers: [RegisterPageService]
})
export class RegisterPageComponent implements OnInit {
  public passwordFormatValid: boolean = true;
  public emailFormatValid: boolean = true;

  constructor(private registerPageService: RegisterPageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  model = {
    email: null,
    username: null,
    password: null,
    confirmPassword: null
  };

  onSubmit() {
    this.registerPageService.registerAccount(this.model).then(response => {
      localStorage.setItem('myprofile_auth_token', response.json().token);
      this.router.navigate(['/home']);
    }, registerError => {
      // TODO need to do Error codes
      let status = registerError.status;
      let message = registerError.json() && registerError.json().message && registerError.json().message.toLowerCase();
      // Check for reasons why
      if (status === 400 && message && message.indexOf('email') !== -1) {
        //username already exists
      } else if (status === 400 && message && message.indexOf('username')) {
        //
      }
    });
  }

  //TODO need validators for email and password

  //TODO need dynamic check on username availability

}
