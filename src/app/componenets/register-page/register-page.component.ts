import { Component, OnInit } from '@angular/core';

import { RegisterPageService } from './register-page.service';
import { HttpServiceService } from '../../http-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass'],
  providers: [RegisterPageService, HttpServiceService]
})
export class RegisterPageComponent implements OnInit {
  public passwordFormatValid: boolean = true;
  public emailFormatValid: boolean = true;

  constructor(private registerPageService: RegisterPageService, private http: HttpServiceService) { }

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
      this.http.bearerToken = `bearer ${response.data.token}`
    }, registerError => {
      // TODO need to do Error codes
      let status = registerError.status;
      let message = registerError.json() && registerError.json().message && registerError.json().message.toLowerCase();
      // Check for reasons why
      if (status === 400 && message && message.indexOf('email') !== -1) {

      } else if (status === 400 && message && message.indexOf('username')) {

      }
    });
  }

  //TODO need validators for email and password

  //TODO need dynamic check on username availability

}
