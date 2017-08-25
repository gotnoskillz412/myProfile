'use strict';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {RegisterPageService} from './register-page.service';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
    selector: 'sfh-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['register-page.component.less'],
    providers: [RegisterPageService]
})
export class RegisterPageComponent implements OnInit {
    @ViewChild('registerForm') registerForm;
    constructor(private registerPageService: RegisterPageService,
                private notifications: NotificationsService,
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
            this.notifications.success('Created Account', 'New Account Created Successfully');
            this.router.navigate(['/home']);
        });
    }
}
