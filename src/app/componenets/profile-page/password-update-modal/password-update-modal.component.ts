import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ProfilePageService} from "../profile-page.service";
import {Account} from "../../../models/account";

export interface PasswordUpdateModel {
    title: string;
}

@Component({
    selector: 'sfh-password-update-modal',
    templateUrl: './password-update-modal.component.html',
    styleUrls: ['./password-update-modal.component.less'],
    providers: [ProfilePageService]
})
export class PasswordUpdateModalComponent extends DialogComponent<PasswordUpdateModel, Account> implements PasswordUpdateModel {

    title: string;
    passwords: any;

    constructor(dialogService: DialogService, private profilePageService: ProfilePageService) {
        super(dialogService);
        this.passwords = {
            oldPassword: null,
            confirmPassword: null,
            newPassword: null
        };
    }

    confirm() {
        this.profilePageService.updatePassword(this.passwords).then((response) => {
            this.result = response;
            this.close();
        })
    }

}
