'use strict';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {RegisterPageService} from './register-page.service';

@Component({
    selector: 'sfh-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['register-page.component.less'],
    providers: [RegisterPageService]
})
export class RegisterPageComponent implements OnInit {
    @ViewChild('registerForm') registerForm;
    constructor(private registerPageService: RegisterPageService,
                private router: Router) {
    }

    ngOnInit() {
    }

    model = {
        email: null,
        firstName: null,
        lastName: null,
        username: null,
        password: null,
        confirmPassword: null
    };

    onSubmit() {
        this.registerPageService.registerAccount(this.model).then(() => {
            this.router.navigate(['/home']);
        });
    }
}
