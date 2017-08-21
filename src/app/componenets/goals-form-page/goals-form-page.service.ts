import {Injectable} from '@angular/core';
import {Location} from '@angular/common'
import {Option22Service} from "../../helpers/option22.service";
import {HelpersService} from "../../helpers/helpers.service";
import {Goal} from "../../models/goal";

@Injectable()
export class GoalsFormPageService {

    constructor(private http: Option22Service, private helpersService: HelpersService) {
    }

    saveGoal(goal: Goal): Promise<Goal> {
        return new Promise((resolve) => {
            this.helpersService.getAuthUri()
                .then((authUri) => {
                    let collectionUrl = Location.joinWithSlash(authUri, 'goals');
                    return this.http.post(collectionUrl, goal).toPromise();
                })
                .then((response) => {
                    resolve(response.json());
                });
        });
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

}
