import {TestBed, inject} from '@angular/core/testing';

import {GoalsListPageService} from './goals-list-page.service';
import {Subgoal} from "../../models/subgoal";
import {Goal} from "../../models/goal";
import {HelpersService} from "../../helpers/helpers.service";
import {Option22Service} from "../../helpers/option22.service";

describe('GoalsListPageService', () => {
    let mockSubgoal = new Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    let mockGoal = new Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];

    class MockHttpService {
        delete() {
            return {
                toPromise: () => {
                    return Promise.resolve('success');
                }
            };
        }
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
        getAuthUri(){
            return Promise.resolve('authuri');
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GoalsListPageService,
                {provide: HelpersService, useClass: MockHelpersService},
                {provide: Option22Service, useClass: MockHttpService}
            ]
        });
    });

    it('should test deleteGoal', inject([GoalsListPageService], (service: GoalsListPageService) => {
        service.deleteGoal(mockGoal).then((resp) => {
            expect(resp).toBe('success');
        });
    }));

    it('should test getGoals', inject([GoalsListPageService], (service: GoalsListPageService) => {
        service.getGoals().then((resp) => {
            expect(resp.total).toBe(1);
        });
    }));
});
