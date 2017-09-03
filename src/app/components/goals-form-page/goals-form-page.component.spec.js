"use strict";
/* tslint:disable:no-unused-variable */
var router_1 = require("@angular/router");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var account_service_1 = require("../../helpers/account.service");
var goal_1 = require("../../models/goal");
var goals_form_page_component_1 = require("./goals-form-page.component");
var goals_form_page_service_1 = require("./goals-form-page.service");
var goals_list_page_service_1 = require("../goals-list-page/goals-list-page.service");
var dist_1 = require("angular2-notifications/dist");
var profile_1 = require("../../models/profile");
var subgoal_1 = require("../../models/subgoal");
describe('GoalsFormPageComponent', function () {
    var component;
    var fixture;
    var mockSubgoal = new subgoal_1.Subgoal();
    var notificationSuccess;
    var redirectedUri;
    var dialogCallback;
    var focused;
    var mockProfile = new profile_1.Profile();
    mockProfile._id = 'test_id';
    var mockData;
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    var mockGoal = new goal_1.Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];
    var MockActivatedRoute = (function () {
        function MockActivatedRoute() {
            this.snapshot = {
                data: {
                    goal: mockGoal
                }
            };
        }
        return MockActivatedRoute;
    }());
    var MockRouter = (function () {
        function MockRouter() {
        }
        MockRouter.prototype.navigate = function (url) {
            redirectedUri = url[0];
        };
        return MockRouter;
    }());
    var MockGoalsFormService = (function () {
        function MockGoalsFormService() {
        }
        MockGoalsFormService.prototype.saveGoal = function (goal) {
            return Promise.resolve(mockGoal);
        };
        return MockGoalsFormService;
    }());
    var MockDialogService = (function () {
        function MockDialogService() {
        }
        MockDialogService.prototype.addDialog = function (component, options) {
            expect(options.message).toContain('Are you sure');
            options.confirmFunction().then(function () {
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
    var MockGoalsListService = (function () {
        function MockGoalsListService() {
        }
        MockGoalsListService.prototype.deleteGoal = function (goal) {
            return Promise.resolve();
        };
        return MockGoalsListService;
    }());
    var MockNotificationsService = (function () {
        function MockNotificationsService() {
        }
        MockNotificationsService.prototype.success = function () {
            notificationSuccess = true;
        };
        return MockNotificationsService;
    }());
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.getProfile = function () {
            return Promise.resolve(mockProfile);
        };
        return MockAccountService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule],
            declarations: [goals_form_page_component_1.GoalsFormPageComponent],
            providers: [
                { provide: router_1.ActivatedRoute, useClass: MockActivatedRoute },
                { provide: router_1.Router, useClass: MockRouter },
                { provide: ng2_bootstrap_modal_1.DialogService, useClass: MockDialogService },
                { provide: dist_1.NotificationsService, useClass: MockNotificationsService },
                { provide: account_service_1.AccountService, useClass: MockAccountService }
            ]
        }).overrideComponent(goals_form_page_component_1.GoalsFormPageComponent, {
            set: {
                providers: [
                    { provide: goals_form_page_service_1.GoalsFormPageService, useClass: MockGoalsFormService },
                    { provide: goals_list_page_service_1.GoalsListPageService, useClass: MockGoalsListService }
                ]
            }
        }).compileComponents();
    }));
    beforeEach(function () {
        focused = null;
        notificationSuccess = null;
        redirectedUri = null;
        dialogCallback = null;
        mockData = null;
        fixture = testing_1.TestBed.createComponent(goals_form_page_component_1.GoalsFormPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.formElement = {
            nativeElement: {
                querySelectorAll: function () {
                    return {
                        0: {
                            focus: function () {
                                focused = true;
                            }
                        },
                        1: {
                            focus: function () {
                                focused = true;
                            }
                        }
                    };
                }
            }
        };
    });
    it('should test ngOnInit', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        expect(component.goal._id).toBe(mockGoal._id);
        expect(component.profile._id).toBe(mockProfile._id);
    }));
    it('should test addSubgoal', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.addSubgoal();
        testing_1.tick();
        expect(focused).toBe(true);
        expect(component.goal.subgoals.length).toBe(2);
    }));
    it('should test saveGoal on new goal', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.goal = new goal_1.Goal();
        component.saveGoal();
        expect(component.goal.startDate).not.toBeNull();
        expect(component.goal.startDate).not.toBeUndefined();
        testing_1.tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));
    it('should test saveGoal on existing goal in progress', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.goal.progress = 50;
        component.saveGoal();
        expect(component.goal.finishDate).toBeNull();
        testing_1.tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));
    it('should test saveGoal on existing goal as complete', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.goal.progress = 100;
        component.saveGoal();
        expect(component.goal.finishDate).not.toBeNull();
        testing_1.tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));
    it('should test completeSubgoal', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.completeSubgoal(0);
        expect(component.goal.subgoals[0].completed).toBe(true);
    }));
    it('should test removeSubgoal with no content', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.goal.subgoals[0].description = null;
        component.removeSubgoal(0);
        testing_1.tick(10);
        expect(component.goal.subgoals[0].description).toBeNull();
        expect(focused).toBe(true);
    }));
    it('should test removeSubgoal with content', testing_1.fakeAsync(function () {
        component.ngOnInit();
        testing_1.tick();
        component.goal.subgoals[0].description = 'test';
        component.removeSubgoal(0);
        testing_1.tick(10);
        expect(component.goal.subgoals[0].description).toBeNull();
        expect(focused).toBe(true);
    }));
    it('should test removeGoal', testing_1.fakeAsync(function () {
        mockData = true;
        component.ngOnInit();
        testing_1.tick();
        component.removeGoal();
        testing_1.tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));
});
