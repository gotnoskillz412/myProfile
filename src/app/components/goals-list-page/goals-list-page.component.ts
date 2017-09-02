import {Component, OnInit} from '@angular/core';
import {Goal} from "../../models/goal";
import {ActivatedRoute, Router} from "@angular/router";
import {GoalsListPageService} from "./goals-list-page.service";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {DialogService} from "ng2-bootstrap-modal";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
    selector: 'sfh-goals-list-page',
    templateUrl: './goals-list-page.component.html',
    styleUrls: ['./goals-list-page.component.less'],
    providers: [GoalsListPageService]
})
export class GoalsListPageComponent implements OnInit {

    goals: Goal[];
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private goalsListService: GoalsListPageService,
                private dialogService: DialogService,
                private notifications: NotificationsService) {
    }

    ngOnInit() {
        this.goals = this.activatedRoute.snapshot.data['goals'].data;
    }

    getProgressClass(i: number) {
        let progress = parseInt(this.goals[i].progress.toString(), 10) || 0;
        if (progress > 0 && progress < 100) {
            return 'in-progress';
        } else if (progress === 100) {
            return 'complete'
        }
        return null;
    }

    addNewGoal(id: string) {
        this.router.navigate([`/goals/${id}`]);
    }

    removeGoal(index: number) {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Delete Goal',
            okText: 'Delete',
            cancelText: 'Cancel',
            message: 'Are you sure you want to delete this goal?',
            confirmFunction: () => {
                return this.goalsListService.deleteGoal(this.goals[index])
                    .then(() => {
                        return this.goalsListService.getGoals();
                    });
            }
        })
            .subscribe((goals) => {
                if (goals) {
                    this.notifications.success('Deleted', 'Goal Deleted Successfully');
                    this.goals = goals.data;
                }
            });
    }
}
