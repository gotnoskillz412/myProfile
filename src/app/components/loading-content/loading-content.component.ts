import {Component, OnInit} from '@angular/core';
import {Option22Service} from '../../helpers/option22.service';
import {Subscription} from 'rxjs/Subscription'

@Component({
    selector: 'sfh-loading-content',
    templateUrl: 'loading-content.component.html',
    styleUrls: ['loading-content.component.less']
})
export class LoadingContentComponent implements OnInit {
    subscription: Subscription;
    loadingArr = [];
    loadingWheel = false;

    constructor(private http: Option22Service) {
    }

    ngOnInit() {
        this.subscription = this.http.httpRequest$.subscribe(event => {
            if (event.loading) {
                this.loadingArr.push(event.route);
            } else if (!event.loading && event.route) {
                let index = this.loadingArr.indexOf(event.route);
                this.loadingArr.splice(index, 1);
            } else {
                this.loadingArr = [];
            }
            this.loadingWheel = this.loadingArr.length !== 0;
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

}
