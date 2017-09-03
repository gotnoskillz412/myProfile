import {Component} from '@angular/core';

import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface ConfirmModel {
    title: string;
    confirmFunction: Function;
    message: string;
    okText: string;
    cancelText: string;
}

@Component({
    selector: 'sfh-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {

    title: string;
    confirmFunction: Function;
    okText: string;
    cancelText: string;
    message: string;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    confirm() {
        this.confirmFunction().then((response: any) => {
            this.result = response;
            this.close();
        });
    }

}
