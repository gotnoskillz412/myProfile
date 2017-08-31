/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var loading_content_component_1 = require("./components/loading-content/loading-content.component");
var testing_2 = require("@angular/router/testing");
var option22_service_1 = require("./helpers/option22.service");
describe('AppComponent', function () {
    var mockHttpService = {
        httpRequest$: {
            subscribe: function (cb) {
                cb(event);
                return {
                    unsubscribe: function () {
                    }
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
                providers: [{ provide: option22_service_1.Option22Service, useValue: mockHttpService }]
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
