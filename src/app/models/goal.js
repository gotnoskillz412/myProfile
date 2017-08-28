"use strict";
var Goal = (function () {
    function Goal() {
        this.description = null;
        this.finishDate = null;
        this.startDate = null;
        this.subgoals = [];
        this.progress = 0;
        this.profileId = null;
    }
    return Goal;
}());
exports.Goal = Goal;
