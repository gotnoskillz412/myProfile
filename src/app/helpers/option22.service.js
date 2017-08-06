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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var rxjs_1 = require("rxjs");
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var AppHttpService = (function (_super) {
    __extends(AppHttpService, _super);
    function AppHttpService(backend, options, router) {
        _super.call(this, backend, options);
        this.router = router;
        this._httpRequestSource = new BehaviorSubject_1.BehaviorSubject({ loading: false });
        this.httpRequest$ = this._httpRequestSource.asObservable();
    }
    AppHttpService.prototype.request = function (url, options) {
        var token = localStorage.getItem('myprofile_auth_token');
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new http_1.Headers() };
            }
            options.headers.set('Authorization', "Bearer " + token);
        }
        else {
            url.headers.set('Authorization', "Bearer " + token);
        }
        return _super.prototype.request.call(this, url, options).catch(this.catchAuthError(this));
    };
    AppHttpService.prototype.requestHappening = function (route) {
        this._httpRequestSource.next({ loading: true, route: route });
    };
    AppHttpService.prototype.requestFinished = function (route) {
        this._httpRequestSource.next({ loading: false, route: route });
    };
    AppHttpService.prototype.catchAuthError = function (self) {
        var _this = this;
        // we have to pass HttpService's own instance here as `self`
        return function (res) {
            _this._httpRequestSource.next({ loading: false, route: null });
            if (res.status === 401) {
                var navExtras = {
                    queryParams: { redirect_path: _this.router.url }
                };
                localStorage.removeItem('myprofile_auth_token');
                _this.router.navigate(['/login'], navExtras);
            }
            return rxjs_1.Observable.throw(res);
        };
    };
    AppHttpService = __decorate([
        core_1.Injectable()
    ], AppHttpService);
    return AppHttpService;
}(http_1.Http));
exports.AppHttpService = AppHttpService;
