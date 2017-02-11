import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class AppHttpService extends Http {
  constructor (backend: XHRBackend, options: RequestOptions, private router: Router) {
    super(backend, options);

  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('myprofile_auth_token');
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

  private catchAuthError (self: AppHttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401) {
        this.router.navigate(['/login']);
      }
      return Observable.throw(res);
    };
  }
}
