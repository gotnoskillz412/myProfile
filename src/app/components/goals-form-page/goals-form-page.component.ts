import {ActivatedRoute, Router} from "@angular/router";
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {DialogService} from "ng2-bootstrap-modal";

import {AccountService} from "../../helpers/account.service";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {Goal} from "../../models/goal";
import {GoalsFormPageService} from "./goals-form-page.service";
import {GoalsListPageService} from "../goals-list-page/goals-list-page.service";
import {NotificationsService} from "angular2-notifications/dist";
import {Profile} from "../../models/profile";
import {Subgoal} from "../../models/subgoal";


@Component({
    selector: 'sfh-goals-form-page',
    templateUrl: './goals-form-page.component.html',
    styleUrls: ['./goals-form-page.component.less'],
    providers: [GoalsFormPageService, GoalsListPageService]
})
export class GoalsFormPageComponent implements OnInit {

    goal: Goal;
    profile: Profile;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private goalsFormService: GoalsFormPageService,
                private dialogService: DialogService,
                private goalsListService: GoalsListPageService,
                private notifications: NotificationsService,
                private accountService: AccountService) {
    }

    @ViewChild('goalFormElement') formElement: ElementRef;

    ngOnInit() {
        this.goal = this.activatedRoute.snapshot.data['goal'] as Goal || new Goal();
        if (!this.goal.subgoals.length) {
            this.goal.subgoals.push(new Subgoal);
        }
        this.accountService.getProfile().then((profile) => {
            this.profile = profile;
        });
    }

    addSubgoal() {
        let subgoal = new Subgoal();
        this.goal.subgoals.push(subgoal);
        setTimeout(() => {
            this.formElement.nativeElement.querySelectorAll('.subgoal-description')[this.goal.subgoals.length - 1].focus();
        });
    }

    saveGoal() {
        for (let i = 0; i < this.goal.subgoals.length; i++) {
            if (!this.goal.subgoals[i].description || this.goal.subgoals[i].description.trim().length === 0) {
                this.goal.subgoals.splice(i, 1);
                i--;
            }
        }
        this.goal.progress = parseInt(this.goal.progress.toString(), 10) || this.goal.progress;
        this.goal.profileId = this.profile._id;
        if (!this.goal._id) {
            this.goal.startDate = new Date().toISOString();
        } else if (this.goal.progress === 100 && !this.goal.finishDate) {
            this.goal.finishDate = new Date().toISOString();
        } else if (this.goal.progress !== 100) {
            this.goal.finishDate = null;
        }
        this.goalsFormService.saveGoal(this.goal).then((response) => {
            this.goal = response;
            this.notifications.success('Saved', 'Goal Saved Successfully!');
            this.router.navigate(['/goals']);
        }, () => {
            this.goal.startDate = null;
            this.goal.finishDate = null;
        });
    }

    completeSubgoal(i: number) {
        this.goal.subgoals[i].completed = !this.goal.subgoals[i].completed;
    }

    removeSubgoal(index: number) {
        if (this.goal.subgoals[index].description && this.goal.subgoals[index].description.trim().length > 0) {
            this.dialogService.addDialog(ConfirmModalComponent, {
                title: 'Delete Subtask',
                message: 'Are you sure you want to delete this subtask?',
                okText: 'Delete',
                cancelText: 'Cancel',
                confirmFunction: () => {
                    this.goal.subgoals.splice(index, 1);
                    return Promise.resolve(true)
                }
            }).subscribe(() => {
                if (this.goal.subgoals.length === 0) {
                    this.addSubgoal();
                }
            });
        } else {
            this.goal.subgoals.splice(index, 1);
        }
        if (this.goal.subgoals.length === 0) {
            this.addSubgoal();
        }
    }

    removeGoal() {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Delete Goal',
            okText: 'Delete',
            cancelText: 'Cancel',
            message: 'Are you sure you want to delete this goal?',
            confirmFunction: () => {
                return this.goalsListService.deleteGoal(this.goal);
            }
        })
            .subscribe((goals) => {
                if (goals) {
                    this.notifications.success('Deleted', 'Goal Deleted Successfully!');
                    this.router.navigate(['/goals']);
                }
            });
    }

}
