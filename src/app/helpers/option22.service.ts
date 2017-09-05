import {Injectable} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {Http, Headers, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from "rxjs";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from "./auth.service";
import {NotificationsService} from "angular2-notifications/dist";
import {RequestEvent} from "../models/requestEvent";

@Injectable()
export class Option22Service extends Http {
    private _httpRequestSource = new BehaviorSubject<any>(null);

    constructor(backend: XHRBackend,
                options: RequestOptions,
                private router: Router,
                private notifications: NotificationsService,
                private authService: AuthService) {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = this.authService.getToken();
        let key: string;
        if (typeof url === 'string') {
            key = url;
            if (!options) {
                options = {headers: new Headers()};
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            key = url.url;
            url.headers.set('Authorization', `Bearer ${token}`);
        }
        this.requestHappening(key);
        return super.request(url, options)
            .catch(this.catchAuthError())
            .finally(() => {
                this.requestFinished(key);
            }) as Observable<Response>;
    }

    public httpRequest$ = this._httpRequestSource.asObservable();

    private requestHappening(url: string) {
        let event = new RequestEvent();
        event.type = 'start';
        event.url = url;
        this._httpRequestSource.next(event);
    }

    private requestFinished(url: string) {
        let event = new RequestEvent();
        event.type = 'end';
        event.url = url;
        this._httpRequestSource.next(event);
    }

    private catchAuthError() {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            if (res.status === 401) {
                let navExtras: NavigationExtras = {
                    queryParams: {redirect_path: this.router.url}
                };
                this.authService.removeToken();
                return this.router.navigate(['/login'], navExtras);
            }
            if (res.status >= 500) {
                this.notifications.error('Internal Server Error', 'Problem communicating with backend services. Please try again later.')
            } else if (res.status === 400) {
                console.log('here', res.json());
                this.notifications.error('Error', res.json().message);
            }
            Observable.throw(res);
            return;
        };
    }
}
