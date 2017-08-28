import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {AccountService} from "../../helpers/account.service";

@Injectable()
export class ProfilePageResolverService implements Resolve<any> {
    constructor(private accountService: AccountService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.accountService.getProfile();
    }
}
