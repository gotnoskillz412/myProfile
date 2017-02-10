import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

import {HttpServiceService} from '../../http-service.service';

@Injectable()
export class HomePageService {
  private homeUrl = 'auth/test';

  constructor(private http: HttpServiceService) {
  }

  testCredentials(): Promise<any> {
    let headers = new Headers({'Accept': 'application/json'});
    return this.http.get(this.homeUrl, headers);
  }
}
