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
    loadingWheel = false;
    incoming = 1;

    constructor(private http: Option22Service) {
    }

    ngOnInit() {
        this.subscription = this.http.httpRequest$.subscribe(event => {
            console.log(event);
            if (event === 'start') {
                setTimeout(() => {
                    this.incoming += 1;
                    this.loadingWheel = this.incoming > 0;
                }, 500);
            } else if (event === 'end') {
                this.incoming -= 1;
                this.loadingWheel = this.incoming > 0;
            }
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

}
