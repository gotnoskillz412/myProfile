import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {LoginPageService} from './login-page.service';
import 'rxjs/add/operator/toPromise';
import {AppHelpersService} from "../../app-helpers.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['login-page.component.less'],
    providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
    constructor(private loginPageService: LoginPageService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private appHelpersService: AppHelpersService) {
    }

    redirect: string;
    invalidCredentials: boolean = false;
    model = {
        username: null,
        password: null
    };

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.redirect = params['redirect_path'] || '/home';
        });
    }

    onSubmit() {
        this.loginPageService.sendLoginCredentials(this.model).then(response => {
            localStorage.setItem('myprofile_auth_token', response.json().token);
            if (response.json().profile.picture) {
                this.appHelpersService.updateProfilePicture(response.json().profile.picture);
            }
            this.router.navigate([this.redirect]);
        }, loginError => {
            this.invalidCredentials = true;
            console.log('Error', loginError)
        });
    }

}
