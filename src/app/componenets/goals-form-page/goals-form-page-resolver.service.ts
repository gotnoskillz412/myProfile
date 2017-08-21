import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HelpersService} from "../../helpers/helpers.service";
import {Option22Service} from "../../helpers/option22.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GoalsFormPageResolverService implements Resolve<any> {

    constructor(private helpersService: HelpersService, private http: Option22Service) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve) => {
            if (route.params['id'] === 'new') {
                resolve(null);
                return;
            }
            this.helpersService.getAuthUri().then((url) => {
                this.http.get(Location.joinWithSlash(url, `goals/${route.params['id']}`)).toPromise().then((response) => {
                    resolve(response.json());
                });
            });
        });
    }
}
