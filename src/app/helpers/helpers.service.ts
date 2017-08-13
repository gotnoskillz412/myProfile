import {Injectable} from '@angular/core';

import {AccountService} from "./account.service";
import {environment} from "../../environments/environment";

@Injectable()
export class HelpersService {
    constructor(private accountService: AccountService) {
    }

    getAuthUri(): Promise<string> {
        let accountIndex;
        return this.accountService.getAccount().then((account) => {
            let accountId = account ? account._id : 'null';
            let authUri = environment.authApi;
            let uriParams = authUri.split('/');
            accountIndex = uriParams.indexOf(':accountId');
            uriParams[accountIndex] = accountId;
            return uriParams.join('/');
        });
    }
}
