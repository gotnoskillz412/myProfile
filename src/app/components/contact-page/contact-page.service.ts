import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Response} from '@angular/http';
import {Location} from '@angular/common';

import {environment} from "../../../environments/environment";
import {Option22Service} from '../../helpers/option22.service';

@Injectable()
export class ContactPageService {
    private emailUrl = Location.joinWithSlash(environment.baseApi, 'email');

    constructor(private http: Option22Service) {
    }

    sendMessage(emailInfo: any): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = {
            name: emailInfo.name,
            email: emailInfo.email,
            subject: 'EMAIL INQUIRY FROM WEBSITE',
            message: emailInfo.message
        };
        return this.http.post(this.emailUrl, body, options).toPromise().then(function (response: Response) {
            return response;
        }.bind(this));
    }

}
