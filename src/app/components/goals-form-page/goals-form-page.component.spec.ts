import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {GoalsFormPageComponent} from './goals-form-page.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {Goal} from "../../models/goal";
import {Subgoal} from "../../models/subgoal";
import {GoalsFormPageService} from "./goals-form-page.service";
import {GoalsListPageService} from "../goals-list-page/goals-list-page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {NotificationsService} from "angular2-notifications/dist";
import {AccountService} from "../../helpers/account.service";
import {Profile} from "../../models/profile";

describe('GoalsFormPageComponent', () => {
    let component: GoalsFormPageComponent;
    let fixture: ComponentFixture<GoalsFormPageComponent>;
    let mockSubgoal = new Subgoal();
    let notificationSuccess;
    let redirectedUri;
    let dialogCallback;
    let focused;

    let mockProfile = new Profile();
    mockProfile._id = 'test_id';
    let mockData;
    mockSubgoal._id = 'test_subgoal_id';
    mockSubgoal.goalId = 'test_goal_id';
    mockSubgoal.description = 'test_subgoal_description';
    let mockGoal = new Goal();
    mockGoal._id = 'test_goal_id';
    mockGoal.description = 'test_goal_description';
    mockGoal.subgoals = [mockSubgoal];

    class MockActivatedRoute {
        snapshot = {
            data: {
                goal: mockGoal
            }
        }
    }

    class MockRouter {
        navigate(url) {
            redirectedUri = url[0];
        }
    }

    class MockGoalsFormService {
        saveGoal(goal) {
            return Promise.resolve(mockGoal);
        }
    }

    class MockDialogService {
        addDialog(component, options) {
            expect(options.message).toContain('Are you sure');
            options.confirmFunction().then(() => {
                dialogCallback(mockData);
            });
            return {
                subscribe: (cb) => {
                    dialogCallback = cb;
                }
            }
        }
    }

    class MockGoalsListService {
        deleteGoal(goal){
            return Promise.resolve();
        }
    }

    class MockNotificationsService {
        success() {
            notificationSuccess = true;
        }
    }

    class MockAccountService {
        getProfile() {
            return Promise.resolve(mockProfile);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, BrowserModule],
            declarations: [GoalsFormPageComponent],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: Router, useClass: MockRouter},
                {provide: DialogService, useClass: MockDialogService},
                {provide: NotificationsService, useClass: MockNotificationsService},
                {provide: AccountService, useClass: MockAccountService}
            ]
        }).overrideComponent(GoalsFormPageComponent, {
            set: {
                providers: [
                    {provide: GoalsFormPageService, useClass: MockGoalsFormService},
                    {provide: GoalsListPageService, useClass: MockGoalsListService}
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        focused = null;
        notificationSuccess = null;
        redirectedUri = null;
        dialogCallback = null;
        mockData = null;
        fixture = TestBed.createComponent(GoalsFormPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.formElement = {
            nativeElement: {
                querySelectorAll: () => {
                    return {
                        0: {
                            focus: () => {
                                focused = true;
                            }
                        },
                        1: {
                            focus: () => {
                                focused = true;
                            }
                        }
                    }
                }
            }
        }
    });

    it('should test ngOnInit', fakeAsync(() => {
        component.ngOnInit();
        tick();
        expect(component.goal._id).toBe(mockGoal._id);
        expect(component.profile._id).toBe(mockProfile._id);
    }));

    it('should test addSubgoal', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.addSubgoal();
        tick();
        expect(focused).toBe(true);
        expect(component.goal.subgoals.length).toBe(2);
    }));

    it('should test saveGoal on new goal', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.goal = new Goal();
        component.saveGoal();
        expect(component.goal.startDate).not.toBeNull();
        expect(component.goal.startDate).not.toBeUndefined();
        tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));

    it('should test saveGoal on existing goal in progress', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.goal.progress = 50;
        component.saveGoal();
        expect(component.goal.finishDate).toBeNull();
        tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));

    it('should test saveGoal on existing goal as complete', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.goal.progress = 100;
        component.saveGoal();
        expect(component.goal.finishDate).not.toBeNull();
        tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));

    it('should test completeSubgoal', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.completeSubgoal(0);
        expect(component.goal.subgoals[0].completed).toBe(true);
    }));

    it('should test removeSubgoal with no content', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.goal.subgoals[0].description = null;
        component.removeSubgoal(0);
        tick(10);
        expect(component.goal.subgoals[0].description).toBeNull();
        expect(focused).toBe(true);
    }));

    it('should test removeSubgoal with content', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.goal.subgoals[0].description = 'test';
        component.removeSubgoal(0);
        tick(10);
        expect(component.goal.subgoals[0].description).toBeNull();
        expect(focused).toBe(true);
    }));

    it('should test removeGoal', fakeAsync(() => {
        mockData = true;
        component.ngOnInit();
        tick();
        component.removeGoal();
        tick();
        expect(notificationSuccess).toBe(true);
        expect(redirectedUri).toBe('/goals');
    }));
});
