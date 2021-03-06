import {Component, OnInit} from '@angular/core';

import {Subscription} from 'rxjs/Subscription'

import {Option22Service} from '../../helpers/option22.service';
import {RequestEvent} from "../../models/requestEvent";


@Component({
    selector: 'sfh-loading-content',
    templateUrl: 'loading-content.component.html',
    styleUrls: ['loading-content.component.less']
})
export class LoadingContentComponent implements OnInit {
    subscription: Subscription;
    loadingWheel = false;
    incoming: Array<string> = [];
    loadingArr: Array<string> = [];
    dontLoad: Array<string> = [];

    constructor(private http: Option22Service) {
    }

    ngOnInit() {
        this.subscription = this.http.httpRequest$.subscribe((event: RequestEvent) => {
            if (event && event.type === 'start') {
                this.incoming.push(event.url);
                setTimeout(() => {
                    let startIndex: number = this.dontLoad.indexOf(event.url);
                    if (startIndex === -1) {
                        this.loadingArr.push(event.url);
                    } else {
                        this.dontLoad.splice(startIndex, 1);
                    }
                    this.loadingWheel = this.loadingArr.length > 0;
                }, 500);
            } else if (event && event.type === 'end') {
                let incomingIndex: number = this.incoming.indexOf(event.url);
                if (incomingIndex === -1) {
                    return;
                }
                let endIndex: number = this.loadingArr.indexOf(event.url);
                if (endIndex === -1) {
                    this.dontLoad.push(event.url);
                } else {
                    this.loadingArr.splice(endIndex, 1);
                }
                this.incoming.splice(incomingIndex, 1);
                this.loadingWheel = this.loadingArr.length > 0;
            } else {
                this.loadingArr = [];
                this.dontLoad = [];
            }
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }
}
