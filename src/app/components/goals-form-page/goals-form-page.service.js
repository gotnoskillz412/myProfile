"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var GoalsFormPageService = (function () {
    function GoalsFormPageService(http, helpersService) {
        this.http = http;
        this.helpersService = helpersService;
    }
    GoalsFormPageService.prototype.saveGoal = function (goal) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.helpersService.getAuthUri()
                .then(function (authUri) {
                if (!goal._id) {
                    var collectionUrl_1 = common_1.Location.joinWithSlash(authUri, 'goals');
                    return _this.http.post(collectionUrl_1, goal).toPromise();
                }
                var collectionUrl = common_1.Location.joinWithSlash(authUri, "goals/" + goal._id);
                return _this.http.put(collectionUrl, goal).toPromise();
            })
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    return GoalsFormPageService;
}());
GoalsFormPageService = __decorate([
    core_1.Injectable()
], GoalsFormPageService);
exports.GoalsFormPageService = GoalsFormPageService;
