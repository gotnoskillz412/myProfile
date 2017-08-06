import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {AccountService} from '../../helpers/account.service'
import {AuthService} from '../../helpers/auth.service';
import {LoginPageService} from './login-page.service';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'sfh-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['login-page.component.less'],
    providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
    constructor(private loginPageService: LoginPageService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private accountService: AccountService) {
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
        this.loginPageService.sendLoginCredentials(this.model).then((response) => {
            AuthService.setToken(response.json().token);
            this.accountService.setAccount(response.json().account);
            this.accountService.setProfile(response.json().profile);
            if (response.json().profile.picture) {
                this.accountService.updateProfilePicture(response.json().profile.picture);
            }
            this.router.navigate([this.redirect]);
        }, () => {
            this.invalidCredentials = true;
        });
    }

}
