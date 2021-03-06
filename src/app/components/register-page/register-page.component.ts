import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NotificationsService} from "angular2-notifications/dist";

import {RegisterPageService} from './register-page.service';

@Component({
    selector: 'sfh-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['register-page.component.less'],
    providers: [RegisterPageService]
})
export class RegisterPageComponent implements OnInit {
    constructor(private registerPageService: RegisterPageService,
                private notifications: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
    }

    model = {
        email: <string> null,
        firstName: <string> null,
        lastName: <string> null,
        username: <string> null,
        password: <string> null,
        confirmPassword: <string> null
    };

    onSubmit() {
        this.registerPageService.registerAccount(this.model).then(() => {
            this.notifications.success('Created Account', 'New Account Created Successfully');
            this.router.navigate(['/goals']);
        }).catch(() => {
            // do nothing
        });
    }
}
