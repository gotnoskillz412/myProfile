import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Goal} from "../../models/goal";
import {Subgoal} from "../../models/subgoal";
import {GoalsFormPageService} from "./goals-form-page.service";
import {Profile} from "../../models/profile";
import {AccountService} from "../../helpers/account.service";

@Component({
    selector: 'sfh-goals-form-page',
    templateUrl: './goals-form-page.component.html',
    styleUrls: ['./goals-form-page.component.less'],
    providers: [GoalsFormPageService]
})
export class GoalsFormPageComponent implements OnInit {

    goal: Goal;
    profile: Profile;

    constructor(private activatedRoute: ActivatedRoute, private goalsFormService: GoalsFormPageService, private accountService: AccountService) {
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
        this.goalsFormService.saveGoal(this.goal);
    }

    removeSubgoal(index) {
        if (this.goal.subgoals.length > 1 || (this.goal.subgoals[index].description && this.goal.subgoals[index].description.trim().length > 0)) {
            this.goal.subgoals.splice(index, 1);
        }
        if (this.goal.subgoals.length === 0) {
            this.addSubgoal();
        }
    }

}
