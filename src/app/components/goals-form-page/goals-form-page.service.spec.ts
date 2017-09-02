import {TestBed, inject} from '@angular/core/testing';

import {GoalsFormPageService} from './goals-form-page.service';
import {Goal} from "../../models/goal";
import {Subgoal} from "../../models/subgoal";
import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";

describe('GoalsFormPageService', () => {
    let mockSubgoal = new Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    let mockGoal = new Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];
    class MockHttpService {
        post() {
            return {
                toPromise: () => {
                    let result = {
                        json: () => {
                            return 'saved';
                        }
                    };
                    return Promise.resolve(result);
                }
            }
        }
        put() {
            return {
                toPromise: () => {
                    let result = {
                        json: () => {
                            return 'updated';
                        }
                    };
                    return Promise.resolve(result);
                }
            }
        }
    }

    class MockHelpersService {
        getAuthUri() {
            return Promise.resolve('authuri');
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GoalsFormPageService,
                {provide: Option22Service, useClass: MockHttpService},
                {provide: HelpersService, useClass: MockHelpersService}
            ]
        });
    });

    it('should test saveGoal update', inject([GoalsFormPageService], (service: GoalsFormPageService) => {
        service.saveGoal(mockGoal).then((resp) => {
            expect(resp).toBe('updated');
        });
    }));

    it('should test saveGoal new', inject([GoalsFormPageService], (service: GoalsFormPageService) => {
        mockGoal._id = null;
        service.saveGoal(mockGoal).then((resp) => {
            expect(resp).toBe('saved');
        });
    }));
});
