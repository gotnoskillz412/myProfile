import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService} from '../../helpers/account.service'
import {LoginPageService} from './login-page.service';

@Component({
    selector: 'sfh-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['login-page.component.less'],
    providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
    constructor(private loginPageService: LoginPageService,
                private router: Router,
                private accountService: AccountService) {
    }

    invalidCredentials: boolean = false;
    model = {
        username: null,
        password: null
    };

    ngOnInit() {
    }

    onSubmit() {
        this.loginPageService.sendLoginCredentials(this.model).then((response) => {
            if (response.json().profile.picture) {
                this.accountService.updateProfilePicture(response.json().profile.picture);
            }
            this.router.navigate(['/goals']);
        }, () => {
            this.invalidCredentials = true;
        });
    }

}
