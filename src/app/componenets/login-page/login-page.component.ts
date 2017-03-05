import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {LoginPageService} from './login-page.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['login-page.component.less'],
  providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
  constructor(private loginPageService: LoginPageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  redirect: string;

  public invalidCredentials: boolean = false;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.redirect = params['redirect_path'] || '/home';
    });
  }

  model = {
    username: null,
    password: null
  };

  onSubmit() {
    this.loginPageService.sendLoginCredentials(this.model).then(response => {
      localStorage.setItem('myprofile_auth_token', response.json().token);
      this.router.navigate([this.redirect]);
    }, loginError => {
      this.invalidCredentials = true;
      console.log('Error', loginError)
    });
  }

}
