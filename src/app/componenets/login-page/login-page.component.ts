import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router) {}

  ngOnInit() {

  }

  model = {
    username: null,
    password: null
  };

  onSubmit() {
    console.log('submitted', this.model);
  }

}
