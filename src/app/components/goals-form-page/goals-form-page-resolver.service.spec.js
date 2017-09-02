"use strict";
var testing_1 = require("@angular/core/testing");
var goals_form_page_resolver_service_1 = require("./goals-form-page-resolver.service");
var subgoal_1 = require("../../models/subgoal");
var goal_1 = require("../../models/goal");
var option22_service_1 = require("../../helpers/option22.service");
var helpers_service_1 = require("../../helpers/helpers.service");
var router_1 = require("@angular/router");
describe('GoalsFormPageResolverService', function () {
    var authUri;
    var mockSubgoal = new subgoal_1.Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    var mockGoal = new goal_1.Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];
    var route = new router_1.ActivatedRouteSnapshot();
    route.params = {};
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.get = function () {
            return {
                toPromise: function () {
                    var result = {
                        json: function () { return mockGoal; }
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
            return Promise.resolve(authUri);
        };
        return MockHelpersService;
    }());
    beforeEach(function () {
        authUri = null;
        testing_1.TestBed.configureTestingModule({
            providers: [goals_form_page_resolver_service_1.GoalsFormPageResolverService,
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: helpers_service_1.HelpersService, useClass: MockHelpersService }
            ]
        });
    });
    it('should test resolve with authuri', testing_1.inject([goals_form_page_resolver_service_1.GoalsFormPageResolverService], function (service) {
        authUri = 'test';
        route.params['id'] = 'test';
        service.resolve(route, null).then(function (resp) {
            expect(resp._id).toBe(mockGoal._id);
        });
    }));
    it('should test resolve without authuri', testing_1.inject([goals_form_page_resolver_service_1.GoalsFormPageResolverService], function (service) {
        route.params['id'] = 'test';
        service.resolve(route, null).then(function (resp) {
            expect(resp).toBeNull();
        });
    }));
    it('should test resolve with new goal', testing_1.inject([goals_form_page_resolver_service_1.GoalsFormPageResolverService], function (service) {
        route.params['id'] = 'new';
        service.resolve(route, null).then(function (resp) {
            expect(resp).toBeNull();
        });
    }));
});
