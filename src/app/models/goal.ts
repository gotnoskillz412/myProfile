import {Subgoal} from "./subgoal";

export class Goal {
    description: string = null;
    completed: boolean = false;
    subgoals: Subgoal[] = [];
    progress: number = 0;
    profileId: string = null;
    _id: string;
}
