"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var GoalsListPageResolverService = (function () {
    function GoalsListPageResolverService(helpersService, http) {
        this.helpersService = helpersService;
        this.http = http;
    }
    GoalsListPageResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.helpersService.getAuthUri().then(function (url) {
                if (url) {
                    _this.http.get(common_1.Location.joinWithSlash(url, 'goals')).toPromise().then(function (response) {
                        resolve(response.json());
                    });
                }
                else {
                    resolve(null);
                }
            });
        });
    };
    return GoalsListPageResolverService;
}());
GoalsListPageResolverService = __decorate([
    core_1.Injectable()
], GoalsListPageResolverService);
exports.GoalsListPageResolverService = GoalsListPageResolverService;
