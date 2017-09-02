import {TestBed, inject} from '@angular/core/testing';

import {GoalsFormPageResolverService} from './goals-form-page-resolver.service';
import {Subgoal} from "../../models/subgoal";
import {Goal} from "../../models/goal";
import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";
import {ActivatedRouteSnapshot} from "@angular/router";

describe('GoalsFormPageResolverService', () => {
    let authUri;
    let mockSubgoal = new Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    let mockGoal = new Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];
    let route = new ActivatedRouteSnapshot();
    route.params = {};

    class MockHttpService {
        get() {
            return {
                toPromise: () => {
                    let result = {
                        json: () => mockGoal
                    };
                    return Promise.resolve(result);
                }
            }
        }
    }

    class MockHelpersService {
        getAuthUri() {
            return Promise.resolve(authUri);
        }
    }
    beforeEach(() => {
        authUri = null;
        TestBed.configureTestingModule({
            providers: [GoalsFormPageResolverService,
                {provide: Option22Service, useClass: MockHttpService},
                {provide: HelpersService, useClass: MockHelpersService}
            ]
        });
    });

    it('should test resolve with authuri', inject([GoalsFormPageResolverService], (service: GoalsFormPageResolverService) => {
        authUri = 'test';
        route.params['id'] = 'test';
        service.resolve(route, null).then((resp) => {
            expect(resp._id).toBe(mockGoal._id);
        })
    }));

    it('should test resolve without authuri', inject([GoalsFormPageResolverService], (service: GoalsFormPageResolverService) => {
        route.params['id'] = 'test';
        service.resolve(route, null).then((resp) => {
            expect(resp).toBeNull();
        })
    }));

    it('should test resolve with new goal', inject([GoalsFormPageResolverService], (service: GoalsFormPageResolverService) => {
        route.params['id'] = 'new';
        service.resolve(route, null).then((resp) => {
            expect(resp).toBeNull();
        })
    }));
});
