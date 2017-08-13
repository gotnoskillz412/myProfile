import {Injectable} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {Http, Headers, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from "rxjs";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from "./auth.service";

@Injectable()
export class Option22Service extends Http {
    private _httpRequestSource = new BehaviorSubject<any>({loading: false});

    constructor(backend: XHRBackend, options: RequestOptions, private router: Router) {
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
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    httpRequest$ = this._httpRequestSource.asObservable();

    requestHappening(route: string) {
        this._httpRequestSource.next({loading: true, route: route});
    }

    requestFinished(route: string) {
        this._httpRequestSource.next({loading: false, route: route});
    }

    catchAuthError(self: Option22Service) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            self._httpRequestSource.next({loading: false, route: null});
            if (res.status === 401) {
                let navExtras: NavigationExtras = {
                    queryParams: {redirect_path: this.router.url}
                };
                AuthService.removeToken();
                this.router.navigate(['/login'], navExtras);
                return Promise.resolve();
            }
            return Observable.throw(res);
        };
    }
}
