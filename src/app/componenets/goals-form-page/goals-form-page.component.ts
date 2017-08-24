import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Goal} from "../../models/goal";
import {Subgoal} from "../../models/subgoal";
import {GoalsFormPageService} from "./goals-form-page.service";
import {Profile} from "../../models/profile";
import {AccountService} from "../../helpers/account.service";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {DialogService} from "ng2-bootstrap-modal";
import {GoalsListPageService} from "../goals-list-page/goals-list-page.service";

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
                private accountService: AccountService) {
    }

    @ViewChild('goalForm') form;

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
    }

    saveGoal() {
        for (let i = 0; i < this.goal.subgoals.length; i++) {
            if (!this.goal.subgoals[i].description || this.goal.subgoals[i].description.trim().length === 0) {
                this.goal.subgoals.splice(i, 1);
                i--;
            }
        }
        this.goal.profileId = this.profile._id;
        this.goalsFormService.saveGoal(this.goal).then((response) => {
            this.goal = response;
            this.router.navigate(['/goals']);
        });
    }

    removeSubgoal(index) {
        if (this.goal.subgoals.length > 1 || (this.goal.subgoals[index].description && this.goal.subgoals[index].description.trim().length > 0)) {
            this.goal.subgoals.splice(index, 1);
        }
        if (this.goal.subgoals.length === 0) {
            this.addSubgoal();
        }
    }

    removeGoal(index) {
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
                this.router.navigate(['/goals']);
            });
    }

}
