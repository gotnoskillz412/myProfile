import {Component, OnInit} from '@angular/core';
import {ContactPageService} from './contact-page.service';
import 'rxjs/add/operator/toPromise';
import {AccountService} from "../../helpers/account.service";

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
    profile;
    account;
    model = {
        name: null,
        email: null,
        message: null
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
        this.model.name = null;
        this.model.email = null;
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
