import {Component, OnInit} from '@angular/core';
import {Goal} from "../../models/goal";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'sfh-goals-list-page',
    templateUrl: './goals-list-page.component.html',
    styleUrls: ['./goals-list-page.component.less']
})
export class GoalsListPageComponent implements OnInit {

    goals: Goal[];
    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.goals = this.activatedRoute.snapshot.data['goals'].data;
    }

}
