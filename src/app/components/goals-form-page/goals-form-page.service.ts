import {Injectable} from '@angular/core';
import {Location} from '@angular/common'

import {Goal} from "../../models/goal";
import {HelpersService} from "../../helpers/helpers.service";
import {Option22Service} from "../../helpers/option22.service";

@Injectable()
export class GoalsFormPageService {

    constructor(private http: Option22Service, private helpersService: HelpersService) {
    }

    saveGoal(goal: Goal): Promise<Goal> {
        return new Promise((resolve) => {
            this.helpersService.getAuthUri()
                .then((authUri) => {
                    if (!goal._id) {
                        let collectionUrl = Location.joinWithSlash(authUri, 'goals');
                        return this.http.post(collectionUrl, goal).toPromise();
                    }
                    let collectionUrl = Location.joinWithSlash(authUri, `goals/${goal._id}`);
                    return this.http.put(collectionUrl, goal).toPromise();

                })
                .then((response) => {
                    resolve(response.json());
                });
        });
    }
}
