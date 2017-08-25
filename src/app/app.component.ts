import {Component} from '@angular/core';

@Component({
    selector: 'sfh-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.less']
})
export class AppComponent {
    constructor() {
    }

    notificationOptions = {
        position: ['top', 'right'],
        timeOut: 2000
    };
}
