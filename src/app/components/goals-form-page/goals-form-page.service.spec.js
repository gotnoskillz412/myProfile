"use strict";
var testing_1 = require("@angular/core/testing");
var goals_form_page_service_1 = require("./goals-form-page.service");
var goal_1 = require("../../models/goal");
var subgoal_1 = require("../../models/subgoal");
var option22_service_1 = require("../../helpers/option22.service");
var helpers_service_1 = require("../../helpers/helpers.service");
describe('GoalsFormPageService', function () {
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
        MockHttpService.prototype.post = function () {
            return {
                toPromise: function () {
                    var result = {
                        json: function () {
                            return 'saved';
                        }
                    };
                    return Promise.resolve(result);
                }
            };
        };
        MockHttpService.prototype.put = function () {
            return {
                toPromise: function () {
                    var result = {
                        json: function () {
                            return 'updated';
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
            providers: [goals_form_page_service_1.GoalsFormPageService,
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: helpers_service_1.HelpersService, useClass: MockHelpersService }
            ]
        });
    });
    it('should test saveGoal update', testing_1.inject([goals_form_page_service_1.GoalsFormPageService], function (service) {
        service.saveGoal(mockGoal).then(function (resp) {
            expect(resp).toBe('updated');
        });
    }));
    it('should test saveGoal new', testing_1.inject([goals_form_page_service_1.GoalsFormPageService], function (service) {
        service.saveGoal(mockGoal).then(function (resp) {
            expect(resp).toBe('saved');
        });
    }));
});
