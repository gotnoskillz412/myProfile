import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Goal} from "../../models/goal";
import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";

@Injectable()
export class GoalsListPageService {

    constructor(private http: Option22Service, private helpersService: HelpersService) {
    }

    deleteGoal(goal: Goal): Promise<any> {
        return new Promise((resolve) => {
            this.helpersService.getAuthUri()
                .then((authUri) => {
                    let collectionUrl = Location.joinWithSlash(authUri, `goals/${goal._id}`);
                    return this.http.delete(collectionUrl).toPromise();
                })
                .then(resolve);
        });
    }

    getGoals(): Promise<any> {
        return new Promise((resolve) => {
            this.helpersService.getAuthUri()
                .then((authUri) => {
                    let collectionUrl = Location.joinWithSlash(authUri, `goals`);
                    return this.http.get(collectionUrl).toPromise();
                })
                .then((goals) => {
                    resolve(goals.json())
                });
        });
    }

}
