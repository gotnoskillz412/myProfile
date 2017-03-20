/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var loading_content_component_1 = require("./componenets/loading-content/loading-content.component");
var testing_2 = require("@angular/router/testing");
var app_http_service_1 = require("./app-http.service");
describe('AppComponent', function () {
    var mockHttpService = {
        httpRequest$: {
            subscribe: function (cb) {
                cb(event);
                return {
                    unsubscribe: function () { }
                };
            }
        }
    };
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [testing_2.RouterTestingModule],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        }).overrideComponent(loading_content_component_1.LoadingContentComponent, {
            set: {
                providers: [{ provide: app_http_service_1.AppHttpService, useValue: mockHttpService }]
            }
        });
        testing_1.TestBed.compileComponents();
    });
    it('should create the app', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
