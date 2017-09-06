import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {Option22Service} from "../../helpers/option22.service";
import {environment} from "../../../environments/environment";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
    selector: 'sfh-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private http: Option22Service,
                private notifications: NotificationsService) {
    }

    private email: string;
    private identifier: string;

    model = {
        password: <string> null,
        confirmPassword: <string> null
    };

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.identifier = params['id'];
        });

        this.activatedRoute.queryParams.subscribe((params) => {
            this.email = params['email'];
        });
    }

    onSubmit() {
        let body = {
            password: this.model.password,
            email: this.email,
            identifier: this.identifier
        };
        this.http.put(Location.joinWithSlash(environment.baseApi, 'auth/passwordreset'), body).toPromise().then(() => {
            this.notifications.success('Updated', 'Password was updated successfully!');
            this.router.navigate(['/login']);
        }).catch(() => {
            // do nothing
        });

    }

}
