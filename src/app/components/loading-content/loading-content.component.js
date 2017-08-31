"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LoadingContentComponent = (function () {
    function LoadingContentComponent(http) {
        this.http = http;
        this.loadingWheel = false;
        this.incoming = [];
        this.loadingArr = [];
        this.dontLoad = [];
    }
    LoadingContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.http.httpRequest$.subscribe(function (event) {
            if (event && event.type === 'start') {
                _this.incoming.push(event.url);
                setTimeout(function () {
                    var startIndex = _this.dontLoad.indexOf(event.url);
                    if (startIndex === -1) {
                        _this.loadingArr.push(event.url);
                    }
                    else {
                        _this.dontLoad.splice(startIndex, 1);
                    }
                    _this.loadingWheel = _this.loadingArr.length > 0;
                }, 500);
            }
            else if (event && event.type === 'end') {
                var incomingIndex = _this.incoming.indexOf(event.url);
                if (incomingIndex === -1) {
                    return;
                }
                var endIndex = _this.loadingArr.indexOf(event.url);
                if (endIndex === -1) {
                    _this.dontLoad.push(event.url);
                }
                else {
                    _this.loadingArr.splice(endIndex, 1);
                }
                _this.incoming.splice(incomingIndex, 1);
                _this.loadingWheel = _this.loadingArr.length > 0;
            }
            else {
                _this.loadingArr = [];
                _this.dontLoad = [];
            }
        });
    };
    LoadingContentComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    return LoadingContentComponent;
}());
LoadingContentComponent = __decorate([
    core_1.Component({
        selector: 'sfh-loading-content',
        templateUrl: 'loading-content.component.html',
        styleUrls: ['loading-content.component.less']
    })
], LoadingContentComponent);
exports.LoadingContentComponent = LoadingContentComponent;
