"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TagsComponent = (function () {
    function TagsComponent() {
    }
    TagsComponent.prototype.ngOnInit = function () {
    };
    return TagsComponent;
}());
__decorate([
    core_1.Input()
], TagsComponent.prototype, "tag");
__decorate([
    core_1.Input()
], TagsComponent.prototype, "onRemove");
__decorate([
    core_1.Input()
], TagsComponent.prototype, "index");
TagsComponent = __decorate([
    core_1.Component({
        selector: 'sfh-tags',
        templateUrl: './tags.component.html',
        styleUrls: ['./tags.component.less']
    })
], TagsComponent);
exports.TagsComponent = TagsComponent;
