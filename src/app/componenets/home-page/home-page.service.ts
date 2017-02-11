import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';

import {AppHttpService} from '../../app-http.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomePageService {
  private homeUrl = 'http://localhost:3000/auth/test';

  constructor(private http: AppHttpService) {
  }

  testCredentials(): Promise<any> {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.homeUrl, options).toPromise();
  }
}
