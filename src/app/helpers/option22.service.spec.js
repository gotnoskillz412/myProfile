"use strict";
/* tslint:disable:no-unused-variable */
var http_1 = require("@angular/http");
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var dist_1 = require("angular2-notifications/dist");
var auth_service_1 = require("./auth.service");
var option22_service_1 = require("./option22.service");
describe('Option22Service', function () {
    var tokenRemoved;
    var notificationError;
    var redirectedUrl;
    var MockAuthService = (function () {
        function MockAuthService() {
        }
        MockAuthService.prototype.getToken = function () {
            return 'test_token';
        };
        MockAuthService.prototype.removeToken = function () {
            tokenRemoved = true;
        };
        return MockAuthService;
    }());
    var MockNotificationsService = (function () {
        function MockNotificationsService() {
        }
        MockNotificationsService.prototype.error = function () {
            notificationError = true;
        };
        return MockNotificationsService;
    }());
    var MockRouter = (function () {
        function MockRouter() {
        }
        MockRouter.prototype.navigate = function (url) {
            redirectedUrl = url[0];
        };
        return MockRouter;
    }());
    beforeEach(function () {
        tokenRemoved = null;
        redirectedUrl = null;
        notificationError = null;
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [option22_service_1.Option22Service, http_1.XHRBackend,
                { provide: auth_service_1.AuthService, useClass: MockAuthService },
                { provide: dist_1.NotificationsService, useClass: MockNotificationsService },
                { provide: router_1.Router, useClass: MockRouter }
            ]
        });
    });
    it('should test the request function', testing_1.inject([option22_service_1.Option22Service], function (service) {
        var eventCaught = false;
        service.httpRequest$.subscribe(function () {
            eventCaught = true;
        });
        service.get('test').toPromise().then(function () {
        })["catch"](function () {
            expect(eventCaught).toBe(true);
        });
    }));
});
