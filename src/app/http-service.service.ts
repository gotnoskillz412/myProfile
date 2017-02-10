import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpServiceService {
  private apiDomain: string = 'http://localhost:3000';
  private bearerToken: string;

  private addAuthHeader(headers) {
    console.log(headers);
    console.log(`In addAuthHeader: and the token is ${this.bearerToken}`);
    headers.append('Authorization', this.bearerToken);
  }

  constructor(private http: Http, private router: Router) {
  }

  get(url, headers: Headers = new Headers({'Accept': 'application/json'})): Promise<any> {
    url = Location.joinWithSlash(this.apiDomain, url);
    this.addAuthHeader(headers);
    console.log(`after header add`);
    console.log(headers);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.http.get(url, options).toPromise().then(response => {
        resolve(response);
      }, getError => {
        if (getError.status === 401 && getError.json().message && getError.json().message.toLowerCase().indexOf('token') !== -1) {
          //redirect to login page
          this.router.navigate(['/login']);
        } else {
          reject(getError);
        }
      });
    });
  }

  post(url, body: string, headers: Headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })): Promise<any> {
    url = Location.joinWithSlash(this.apiDomain, url);
    this.addAuthHeader(headers);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.http.post(url, body, options).toPromise().then(response => {
        resolve(response);
      }, postError => {
        if (postError.status === 401 && postError.json().message && postError.json().message.toLowerCase().indexOf('token') !== -1) {
          //redirect to login page
          this.router.navigate(['/login']);
        } else {
          reject(postError);
        }
      });
    });
  }

  setBearerToken (token) {
      this.bearerToken = `bearer ${token}`;
      console.log(`setting token to ${token}`);
      console.log(`token is now ${this.bearerToken}`);
  }

}
