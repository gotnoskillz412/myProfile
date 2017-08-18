import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Goal} from "../../models/goal";

@Component({
    selector: 'sfh-goals-form-page',
    templateUrl: './goals-form-page.component.html',
    styleUrls: ['./goals-form-page.component.less']
})
export class GoalsFormPageComponent implements OnInit {

    goal: Goal;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.goal = this.activatedRoute.snapshot.data['goal'] || new Goal();
    }

}
