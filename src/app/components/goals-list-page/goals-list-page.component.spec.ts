/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from "@angular/forms";

import {DialogService} from "ng2-bootstrap-modal";
import {NotificationsService} from "angular2-notifications/dist";

import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Goal} from "../../models/goal";
import {GoalsListPageComponent} from './goals-list-page.component';
import {GoalsListPageService} from "./goals-list-page.service";
import {Subgoal} from "../../models/subgoal";

describe('GoalsListPageComponent', () => {
    let component: GoalsListPageComponent;
    let fixture: ComponentFixture<GoalsListPageComponent>;
    let redirectedUrl;
    let notificationSuccess;
    let mockData;
    let dialogCallback;

    let mockSubgoal = new Subgoal();
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    let mockGoal = new Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];

    class MockGoalsListPageService {
        deleteGoal() {
            return Promise.resolve();
        }

        getGoals() {
            return Promise.resolve([]);
        }
    }

    class MockActivatedRoute {
        snapshot = {
            data: {
                goals: {
                    data: [mockGoal]
                }
            }
        }
    }

    class MockRouter {
        navigate(url) {
            redirectedUrl = url[0];
        }
    }

    class MockDialogService {
        addDialog(component, data) {
            expect(data.title).toBe('Delete Goal');
            expect(data.cancelText).toBe('Cancel');
            expect(data.message).toBe('Are you sure you want to delete this goal?');
            data.confirmFunction().then(() => {
                dialogCallback(mockData);
            });
            return {
                subscribe: (cb) => {
                    dialogCallback = cb;
                }
            };
        }
    }

    class MockNotificationsService {
        success() {
            notificationSuccess = true;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterModule],
            declarations: [GoalsListPageComponent],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: Router, useClass: MockRouter},
                {provide: DialogService, useClass: MockDialogService},
                {provide: NotificationsService, useClass: MockNotificationsService}
            ]
        }).overrideComponent(GoalsListPageComponent, {
            set: {
                providers: [{provide: GoalsListPageService, useClass: MockGoalsListPageService}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        redirectedUrl = null;
        notificationSuccess = null;
        mockData = null;
        fixture = TestBed.createComponent(GoalsListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test ngOnInit', () => {
        component.ngOnInit();
        expect(component.goals.length).toBe(1);
    });

    it('should test addNewGoal', () => {
        component.addNewGoal('test');
        expect(redirectedUrl).toBe('/goals/test');
    });

    it('should test getProgressClass', () => {
        component.ngOnInit();
        expect(component.getProgressClass(0)).toBeNull();

        component.goals[0].progress = 50;
        expect(component.getProgressClass(0)).toBe('in-progress');

        component.goals[0].progress = 100;
        expect(component.getProgressClass(0)).toBe('complete');
    });

    it('should test removeGoal', fakeAsync(() => {
        mockData = {data: []};
        component.ngOnInit();
        expect(component.goals.length).toBe(1);
        component.removeGoal(0);
        tick();
        expect(component.goals.length).toBe(0);
    }));
});
