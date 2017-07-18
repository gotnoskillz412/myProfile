import {Injectable} from "@angular/core";
import {Location} from '@angular/common';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AppHttpService} from "../../app-http.service";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable()
export class ProfilePageResolverService implements Resolve<any> {
  constructor(private http: AppHttpService) {}

  private loginUrl = Location.joinWithSlash(environment.baseApi, 'profile');

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.http.get(this.loginUrl);
  }
}
