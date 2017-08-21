import {Component, OnInit} from '@angular/core';
import {Goal} from "../../models/goal";
import {ActivatedRoute} from "@angular/router";
import {GoalsListPageService} from "./goals-list-page.service";

@Component({
    selector: 'sfh-goals-list-page',
    templateUrl: './goals-list-page.component.html',
    styleUrls: ['./goals-list-page.component.less'],
    providers: [GoalsListPageService]
})
export class GoalsListPageComponent implements OnInit {

    goals: Goal[];
    constructor(private activatedRoute: ActivatedRoute, private goalsListService: GoalsListPageService) {
    }

    ngOnInit() {
        this.goals = this.activatedRoute.snapshot.data['goals'].data;
    }

    removeGoal(index) {
        this.goalsListService.deleteGoal(this.goals[index])
            .then(() => {
                return this.goalsListService.getGoals();
            })
            .then((response) => {
                this.goals = response.data;
            })
    }
}
