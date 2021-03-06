"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var requestEvent_1 = require("../models/requestEvent");
var Option22Service = (function (_super) {
    __extends(Option22Service, _super);
    function Option22Service(backend, options, router, notifications, authService) {
        var _this = _super.call(this, backend, options) || this;
        _this.router = router;
        _this.notifications = notifications;
        _this.authService = authService;
        _this._httpRequestSource = new BehaviorSubject_1.BehaviorSubject(null);
        _this.httpRequest$ = _this._httpRequestSource.asObservable();
        return _this;
    }
    Option22Service.prototype.request = function (url, options) {
        var _this = this;
        var token = this.authService.getToken();
        var key;
        if (typeof url === 'string') {
            key = url;
            if (!options) {
                options = { headers: new http_1.Headers() };
            }
            options.headers.set('Authorization', "Bearer " + token);
        }
        else {
            key = url.url;
            url.headers.set('Authorization', "Bearer " + token);
        }
        this.requestHappening(key);
        return _super.prototype.request.call(this, url, options)["catch"](this.catchAuthError())["finally"](function () {
            _this.requestFinished(key);
        });
    };
    Option22Service.prototype.requestHappening = function (url) {
        var event = new requestEvent_1.RequestEvent();
        event.type = 'start';
        event.url = url;
        this._httpRequestSource.next(event);
    };
    Option22Service.prototype.requestFinished = function (url) {
        var event = new requestEvent_1.RequestEvent();
        event.type = 'end';
        event.url = url;
        this._httpRequestSource.next(event);
    };
    Option22Service.prototype.catchAuthError = function () {
        var _this = this;
        // we have to pass HttpService's own instance here as `self`
        return function (res) {
            if (res.status === 401) {
                var navExtras = {
                    queryParams: { redirect_path: _this.router.url }
                };
                _this.authService.removeToken();
                return _this.router.navigate(['/login'], navExtras);
            }
            if (res.status !== 404) {
                _this.notifications.error('Internal Server Error', 'Problem communicating with backend services. Please try again later.');
            }
            rxjs_1.Observable["throw"](res);
            return;
        };
    };
    return Option22Service;
}(http_1.Http));
Option22Service = __decorate([
    core_1.Injectable()
], Option22Service);
exports.Option22Service = Option22Service;
