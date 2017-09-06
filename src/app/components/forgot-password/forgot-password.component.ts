import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Option22Service} from "../../helpers/option22.service";
import {environment} from "../../../environments/environment";
import {NotificationsService} from "angular2-notifications/dist";
import {Router} from "@angular/router";

@Component({
    selector: 'sfh-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {

    constructor(private http: Option22Service,
                private notifications: NotificationsService,
                private router: Router) {
    }
    email: string;
    ngOnInit() {
    }

    onSubmit() {
        this.http.post(Location.joinWithSlash(environment.baseApi, 'email/forgotpassword'), {email: this.email}).toPromise().then(() => {
            this.notifications.success('Success', 'Password reset link has been sent to the email provided');
            this.router.navigate(['/home']);
        }).catch(() => {
            // do nothing
        });
    }

}
