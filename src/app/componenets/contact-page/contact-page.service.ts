import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Headers, RequestOptions} from '@angular/http';
import {Option22Service} from '../../helpers/option22.service';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";

@Injectable()
export class ContactPageService {
    private emailUrl = Location.joinWithSlash(environment.baseApi, 'email');

    constructor(private http: Option22Service) {
    }

    sendMessage(emailInfo): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = {
            name: emailInfo.name,
            email: emailInfo.email,
            subject: 'EMAIL INQUIRY FROM WEBSITE',
            message: emailInfo.message
        };
        this.http.requestHappening(this.emailUrl);
        return this.http.post(this.emailUrl, body, options).toPromise().then(function (response) {
            this.http.requestFinished(this.emailUrl);
            return response;
        }.bind(this));
    }

}
