"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var goals_list_page_service_1 = require("./goals-list-page.service");
var confirm_modal_component_1 = require("../confirm-modal/confirm-modal.component");
var GoalsListPageComponent = (function () {
    function GoalsListPageComponent(activatedRoute, goalsListService, dialogService, notifications) {
        this.activatedRoute = activatedRoute;
        this.goalsListService = goalsListService;
        this.dialogService = dialogService;
        this.notifications = notifications;
    }
    GoalsListPageComponent.prototype.ngOnInit = function () {
        this.goals = this.activatedRoute.snapshot.data['goals'].data;
    };
    GoalsListPageComponent.prototype.getProgressClass = function (i) {
        var progress = parseInt(this.goals[i].progress.toString(), 10) || 0;
        if (progress > 0 && progress < 100) {
            return 'in-progress';
        }
        else if (progress === 100) {
            return 'complete';
        }
        return null;
    };
    GoalsListPageComponent.prototype.removeGoal = function (index) {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Delete Goal',
            okText: 'Delete',
            cancelText: 'Cancel',
            message: 'Are you sure you want to delete this goal?',
            confirmFunction: function () {
                return _this.goalsListService.deleteGoal(_this.goals[index])
                    .then(function () {
                    return _this.goalsListService.getGoals();
                });
            }
        })
            .subscribe(function (goals) {
            if (goals) {
                _this.notifications.success('Deleted', 'Goal Deleted Successfully');
                _this.goals = goals.data;
            }
        });
    };
    return GoalsListPageComponent;
}());
GoalsListPageComponent = __decorate([
    core_1.Component({
        selector: 'sfh-goals-list-page',
        templateUrl: './goals-list-page.component.html',
        styleUrls: ['./goals-list-page.component.less'],
        providers: [goals_list_page_service_1.GoalsListPageService]
    })
], GoalsListPageComponent);
exports.GoalsListPageComponent = GoalsListPageComponent;
