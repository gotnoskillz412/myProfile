import {Subgoal} from "./subgoal";

export class Goal {
    description: string = null;
    finishDate: string = null;
    startDate: string = null;
    subgoals: Subgoal[] = [];
    progress: number = 0;
    profileId: string = null;
    _id: string;
}
