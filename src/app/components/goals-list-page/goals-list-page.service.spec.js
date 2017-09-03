"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var goal_1 = require("../../models/goal");
var goals_list_page_service_1 = require("./goals-list-page.service");
var helpers_service_1 = require("../../helpers/helpers.service");
var option22_service_1 = require("../../helpers/option22.service");
var subgoal_1 = require("../../models/subgoal");
describe('GoalsListPageService', function () {
    var mockSubgoal = new subgoal_1.Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    var mockGoal = new goal_1.Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype["delete"] = function () {
            return {
                toPromise: function () {
                    return Promise.resolve('success');
                }
            };
        };
        MockHttpService.prototype.get = function () {
            return {
                toPromise: function () {
                    var result = {
                        json: function () {
                            return { total: 1, data: [mockGoal] };
                        }
                    };
                    return Promise.resolve(result);
                }
            };
        };
        return MockHttpService;
    }());
    var MockHelpersService = (function () {
        function MockHelpersService() {
        }
        MockHelpersService.prototype.getAuthUri = function () {
            return Promise.resolve('authuri');
        };
        return MockHelpersService;
    }());
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [goals_list_page_service_1.GoalsListPageService,
                { provide: helpers_service_1.HelpersService, useClass: MockHelpersService },
                { provide: option22_service_1.Option22Service, useClass: MockHttpService }
            ]
        });
    });
    it('should test deleteGoal', testing_1.inject([goals_list_page_service_1.GoalsListPageService], function (service) {
        service.deleteGoal(mockGoal).then(function (resp) {
            expect(resp).toBe('success');
        });
    }));
    it('should test getGoals', testing_1.inject([goals_list_page_service_1.GoalsListPageService], function (service) {
        service.getGoals().then(function (resp) {
            expect(resp.total).toBe(1);
        });
    }));
});
