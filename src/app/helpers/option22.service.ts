import {Injectable} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {Http, Headers, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from "rxjs";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from "./auth.service";
import {NotificationsService} from "angular2-notifications/dist";

@Injectable()
export class Option22Service extends Http {
    private _httpRequestSource = new BehaviorSubject<any>(null);

    constructor(backend: XHRBackend, options: RequestOptions, private router: Router, private notifications: NotificationsService) {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = AuthService.getToken();
        if (typeof url === 'string') {
            if (!options) {
                options = {headers: new Headers()};
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            url.headers.set('Authorization', `Bearer ${token}`);
        }
        this.requestHappening();
        return super.request(url, options)
            .catch(this.catchAuthError(this))
            .finally(() => {
                this.requestFinished();
            });
    }

    httpRequest$ = this._httpRequestSource.asObservable();

    requestHappening() {
        this._httpRequestSource.next('start');
    }

    requestFinished() {
        this._httpRequestSource.next('end');
    }

    catchAuthError(self: Option22Service) {
        // console.log('here');
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            if (res.status === 401) {
                let navExtras: NavigationExtras = {
                    queryParams: {redirect_path: this.router.url}
                };
                AuthService.removeToken();
                this.router.navigate(['/login'], navExtras);
                return Promise.resolve();
            }
            if (res.status !== 404 ) {
                this.notifications.error('Internal Server Error', 'Problem communicating with backend services. Please try again later.')
            }
            Observable.throw(res);
            return
        };
    }
}
