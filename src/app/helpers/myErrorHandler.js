'use strict';
var MyErrorHandler = (function () {
    function MyErrorHandler() {
    }
    MyErrorHandler.prototype.handleError = function (error) {
        console.log(error);
    };
    return MyErrorHandler;
}());
exports.MyErrorHandler = MyErrorHandler;
