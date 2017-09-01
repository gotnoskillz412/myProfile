import {TestBed, inject} from '@angular/core/testing';

import {GoalsListPageResolverService} from './goals-list-page-resolver.service';
import {Goal} from "../../models/goal";
import {Subgoal} from "../../models/subgoal";
import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";

describe('GoalsListPageResolverService', () => {
    let authUri;
    let mockSubgoal = new Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    let mockGoal = new Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];

    class MockHttpService {
        get() {
            return {
                toPromise: () => {
                    let result = {
                        json: () => {
                            return {total: 1, data: [mockGoal]}
                        }
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
            providers: [GoalsListPageResolverService,
                {provide: Option22Service, useClass: MockHttpService},
                {provide: HelpersService, useClass: MockHelpersService}
            ]
        });
    });

    it('should test resolve without authuri', inject([GoalsListPageResolverService], (service: GoalsListPageResolverService) => {
        service.resolve(null, null).then((resp) => {
            expect(resp).toBeNull();
        })
    }));

    it('should test resolve with authuri', inject([GoalsListPageResolverService], (service: GoalsListPageResolverService) => {
        authUri = 'authUri';
        service.resolve(null, null).then((resp) => {
            expect(resp.total).toBe(1);
        })
    }));
});
