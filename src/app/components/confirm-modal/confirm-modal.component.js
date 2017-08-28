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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var ConfirmModalComponent = (function (_super) {
    __extends(ConfirmModalComponent, _super);
    function ConfirmModalComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    ConfirmModalComponent.prototype.confirm = function () {
        var _this = this;
        this.confirmFunction().then(function (response) {
            _this.result = response;
            _this.close();
        });
    };
    return ConfirmModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
ConfirmModalComponent = __decorate([
    core_1.Component({
        selector: 'sfh-confirm-modal',
        templateUrl: './confirm-modal.component.html',
        styleUrls: ['./confirm-modal.component.less']
    })
], ConfirmModalComponent);
exports.ConfirmModalComponent = ConfirmModalComponent;
