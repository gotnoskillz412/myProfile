import {Component, OnInit} from '@angular/core';
import {Goal} from "../../models/goal";
import {ActivatedRoute} from "@angular/router";
import {GoalsListPageService} from "./goals-list-page.service";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {DialogService} from "ng2-bootstrap-modal";

@Component({
    selector: 'sfh-goals-list-page',
    templateUrl: './goals-list-page.component.html',
    styleUrls: ['./goals-list-page.component.less'],
    providers: [GoalsListPageService]
})
export class GoalsListPageComponent implements OnInit {

    goals: Goal[];
    constructor(private activatedRoute: ActivatedRoute, private goalsListService: GoalsListPageService, private dialogService: DialogService) {
    }

    ngOnInit() {
        this.goals = this.activatedRoute.snapshot.data['goals'].data;
    }

    removeGoal(index) {
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
                this.goals = goals.data;
            });
    }
}
