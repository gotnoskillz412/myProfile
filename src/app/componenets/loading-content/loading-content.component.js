"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoadingContentComponent = (function () {
    function LoadingContentComponent(http) {
        this.http = http;
        this.loadingArr = [];
        this.loadingWheel = false;
    }
    LoadingContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.http.httpRequest$.subscribe(function (event) {
            if (event.loading) {
                _this.loadingArr.push(event.route);
            }
            else if (!event.loading && event.route) {
                var index = _this.loadingArr.indexOf(event.route);
                _this.loadingArr.splice(index, 1);
            }
            else {
                _this.loadingArr = [];
            }
            _this.loadingWheel = _this.loadingArr.length !== 0;
        });
    };
    LoadingContentComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    LoadingContentComponent = __decorate([
        core_1.Component({
            selector: 'app-loading-content',
            templateUrl: 'loading-content.component.html',
            styleUrls: ['loading-content.component.less']
        })
    ], LoadingContentComponent);
    return LoadingContentComponent;
}());
exports.LoadingContentComponent = LoadingContentComponent;
