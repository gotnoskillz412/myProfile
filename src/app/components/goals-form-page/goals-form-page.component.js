"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var confirm_modal_component_1 = require("../confirm-modal/confirm-modal.component");
var goal_1 = require("../../models/goal");
var goals_form_page_service_1 = require("./goals-form-page.service");
var goals_list_page_service_1 = require("../goals-list-page/goals-list-page.service");
var subgoal_1 = require("../../models/subgoal");
var GoalsFormPageComponent = (function () {
    function GoalsFormPageComponent(activatedRoute, router, goalsFormService, dialogService, goalsListService, notifications, accountService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.goalsFormService = goalsFormService;
        this.dialogService = dialogService;
        this.goalsListService = goalsListService;
        this.notifications = notifications;
        this.accountService = accountService;
    }
    GoalsFormPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.goal = this.activatedRoute.snapshot.data['goal'] || new goal_1.Goal();
        if (!this.goal.subgoals.length) {
            this.goal.subgoals.push(new subgoal_1.Subgoal);
        }
        this.accountService.getProfile().then(function (profile) {
            _this.profile = profile;
        });
    };
    GoalsFormPageComponent.prototype.addSubgoal = function () {
        var _this = this;
        var subgoal = new subgoal_1.Subgoal();
        this.goal.subgoals.push(subgoal);
        setTimeout(function () {
            _this.formElement.nativeElement.querySelectorAll('.subgoal-description')[_this.goal.subgoals.length - 1].focus();
        });
    };
    GoalsFormPageComponent.prototype.saveGoal = function () {
        var _this = this;
        for (var i = 0; i < this.goal.subgoals.length; i++) {
            if (!this.goal.subgoals[i].description || this.goal.subgoals[i].description.trim().length === 0) {
                this.goal.subgoals.splice(i, 1);
                i--;
            }
        }
        this.goal.progress = parseInt(this.goal.progress.toString(), 10) || this.goal.progress;
        this.goal.profileId = this.profile._id;
        if (!this.goal._id) {
            this.goal.startDate = new Date().toISOString();
        }
        else if (this.goal.progress === 100 && !this.goal.finishDate) {
            this.goal.finishDate = new Date().toISOString();
        }
        else if (this.goal.progress !== 100) {
            this.goal.finishDate = null;
        }
        this.goalsFormService.saveGoal(this.goal).then(function (response) {
            _this.goal = response;
            _this.notifications.success('Saved', 'Goal Saved Successfully!');
            _this.router.navigate(['/goals']);
        }, function () {
            _this.goal.startDate = null;
            _this.goal.finishDate = null;
        });
    };
    GoalsFormPageComponent.prototype.completeSubgoal = function (i) {
        this.goal.subgoals[i].completed = !this.goal.subgoals[i].completed;
    };
    GoalsFormPageComponent.prototype.removeSubgoal = function (index) {
        var _this = this;
        if (this.goal.subgoals[index].description && this.goal.subgoals[index].description.trim().length > 0) {
            this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
                title: 'Delete Subtask',
                message: 'Are you sure you want to delete this subtask?',
                okText: 'Delete',
                cancelText: 'Cancel',
                confirmFunction: function () {
                    _this.goal.subgoals.splice(index, 1);
                    return Promise.resolve(true);
                }
            }).subscribe(function () {
                if (_this.goal.subgoals.length === 0) {
                    _this.addSubgoal();
                }
            });
        }
        else {
            this.goal.subgoals.splice(index, 1);
        }
        if (this.goal.subgoals.length === 0) {
            this.addSubgoal();
        }
    };
    GoalsFormPageComponent.prototype.removeGoal = function () {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Delete Goal',
            okText: 'Delete',
            cancelText: 'Cancel',
            message: 'Are you sure you want to delete this goal?',
            confirmFunction: function () {
                return _this.goalsListService.deleteGoal(_this.goal);
            }
        })
            .subscribe(function (goals) {
            if (goals) {
                _this.notifications.success('Deleted', 'Goal Deleted Successfully!');
                _this.router.navigate(['/goals']);
            }
        });
    };
    return GoalsFormPageComponent;
}());
__decorate([
    core_1.ViewChild('goalFormElement')
], GoalsFormPageComponent.prototype, "formElement");
GoalsFormPageComponent = __decorate([
    core_1.Component({
        selector: 'sfh-goals-form-page',
        templateUrl: './goals-form-page.component.html',
        styleUrls: ['./goals-form-page.component.less'],
        providers: [goals_form_page_service_1.GoalsFormPageService, goals_list_page_service_1.GoalsListPageService]
    })
], GoalsFormPageComponent);
exports.GoalsFormPageComponent = GoalsFormPageComponent;
