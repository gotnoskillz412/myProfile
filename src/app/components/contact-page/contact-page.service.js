"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var environment_1 = require("../../../environments/environment");
var ContactPageService = (function () {
    function ContactPageService(http) {
        this.http = http;
        this.emailUrl = common_1.Location.joinWithSlash(environment_1.environment.baseApi, 'email');
    }
    ContactPageService.prototype.sendMessage = function (emailInfo) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {
            name: emailInfo.name,
            email: emailInfo.email,
            subject: 'EMAIL INQUIRY FROM WEBSITE',
            message: emailInfo.message
        };
        return this.http.post(this.emailUrl, body, options).toPromise().then(function (response) {
            return response;
        }.bind(this));
    };
    return ContactPageService;
}());
ContactPageService = __decorate([
    core_1.Injectable()
], ContactPageService);
exports.ContactPageService = ContactPageService;
