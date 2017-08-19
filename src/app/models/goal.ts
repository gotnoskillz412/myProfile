import {Subgoal} from "./subgoal";

export class Goal {
    description: string;
    completed: boolean;
    subgoals: Subgoal[];
    progress: number;
    profileId: string
}
