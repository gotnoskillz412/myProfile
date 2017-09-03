import {Component, OnInit} from '@angular/core';

import {Account} from "../../models/account";
import {AccountService} from "../../helpers/account.service";
import {ContactPageService} from './contact-page.service';
import {Profile} from "../../models/profile";

@Component({
    selector: 'sfh-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.less'],
    providers: [ContactPageService]
})
export class ContactPageComponent implements OnInit {

    constructor(private service: ContactPageService, private accountService: AccountService) {
    }

    emailSuccess: boolean = false;
    emailFailed: boolean = false;
    profile: Profile;
    account: Account;
    model = {
        name: <string> null,
        email: <string> null,
        message: <string> null
    };

    ngOnInit() {
        this.accountService.getProfile().then((profile) => {
            this.model.name = `${profile.firstName} ${profile.lastName}`;
        });
        this.accountService.getAccount().then((account) => {
            this.model.email = account.email;
        });
    }

    private setModel() {
        this.model.message = null;
    }

    onSubmit() {
        this.service.sendMessage(this.model).then(() => {
            this.emailSuccess = true;
            this.setModel();
        }, () => {
            this.emailFailed = true;
        });
    }

    showContactInfo() {
        this.emailFailed = false;
        this.emailSuccess = false;
    }
}
