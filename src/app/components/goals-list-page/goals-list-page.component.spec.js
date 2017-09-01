"use strict";
var testing_1 = require("@angular/core/testing");
var goals_list_page_component_1 = require("./goals-list-page.component");
var goal_1 = require("../../models/goal");
var subgoal_1 = require("../../models/subgoal");
var goals_list_page_service_1 = require("./goals-list-page.service");
var router_1 = require("@angular/router");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var dist_1 = require("angular2-notifications/dist");
var forms_1 = require("@angular/forms");
describe('GoalsListPageComponent', function () {
    var component;
    var fixture;
    var redirectedUrl;
    var notificationSuccess;
    var mockData;
    var dialogCallback;
    var mockSubgoal = new subgoal_1.Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    var mockGoal = new goal_1.Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];
    var MockGoalsListPageService = (function () {
        function MockGoalsListPageService() {
        }
        MockGoalsListPageService.prototype.deleteGoal = function () {
            return Promise.resolve();
        };
        MockGoalsListPageService.prototype.getGoals = function () {
            return Promise.resolve([]);
        };
        return MockGoalsListPageService;
    }());
    var MockActivatedRoute = (function () {
        function MockActivatedRoute() {
            this.snapshot = {
                data: {
                    goals: {
                        data: [mockGoal]
                    }
                }
            };
        }
        return MockActivatedRoute;
    }());
    var MockRouter = (function () {
        function MockRouter() {
        }
        MockRouter.prototype.navigate = function (url) {
            redirectedUrl = url[0];
        };
        return MockRouter;
    }());
    var MockDialogService = (function () {
        function MockDialogService() {
        }
        MockDialogService.prototype.addDialog = function (component, data) {
            expect(data.title).toBe('Delete Goal');
            expect(data.cancelText).toBe('Cancel');
            expect(data.message).toBe('Are you sure you want to delete this goal?');
            data.confirmFunction().then(function () {
                dialogCallback(mockData);
            });
            return {
                subscribe: function (cb) {
                    dialogCallback = cb;
                }
            };
        };
        return MockDialogService;
    }());
    var MockNotificationsService = (function () {
        function MockNotificationsService() {
        }
        MockNotificationsService.prototype.success = function () {
            notificationSuccess = true;
        };
        return MockNotificationsService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, router_1.RouterModule],
            declarations: [goals_list_page_component_1.GoalsListPageComponent],
            providers: [
                { provide: router_1.ActivatedRoute, useClass: MockActivatedRoute },
                { provide: router_1.Router, useClass: MockRouter },
                { provide: ng2_bootstrap_modal_1.DialogService, useClass: MockDialogService },
                { provide: dist_1.NotificationsService, useClass: MockNotificationsService }
            ]
        }).overrideComponent(goals_list_page_component_1.GoalsListPageComponent, {
            set: {
                providers: [{ provide: goals_list_page_service_1.GoalsListPageService, useClass: MockGoalsListPageService }]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        redirectedUrl = null;
        notificationSuccess = null;
        mockData = null;
        fixture = testing_1.TestBed.createComponent(goals_list_page_component_1.GoalsListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test ngOnInit', function () {
        component.ngOnInit();
        expect(component.goals.length).toBe(1);
    });
    it('should test addNewGoal', function () {
        component.addNewGoal('test');
        expect(redirectedUrl).toBe('/goals/test');
    });
    it('should test getProgressClass', function () {
        component.ngOnInit();
        expect(component.getProgressClass(0)).toBeNull();
        component.goals[0].progress = 50;
        expect(component.getProgressClass(0)).toBe('in-progress');
        component.goals[0].progress = 100;
        expect(component.getProgressClass(0)).toBe('complete');
    });
    it('should test removeGoal', testing_1.fakeAsync(function () {
        mockData = { data: [] };
        component.ngOnInit();
        expect(component.goals.length).toBe(1);
        component.removeGoal(0);
        testing_1.tick();
        expect(component.goals.length).toBe(0);
    }));
});
