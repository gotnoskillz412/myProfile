"use strict";
/* tslint:disable:no-unused-variable */
var core_1 = require("@angular/core");
var testing_1 = require("@angular/router/testing");
var testing_2 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
var loading_content_component_1 = require("./components/loading-content/loading-content.component");
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
        testing_2.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [testing_1.RouterTestingModule],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        }).overrideComponent(loading_content_component_1.LoadingContentComponent, {
            set: {
                providers: [{ provide: option22_service_1.Option22Service, useValue: mockHttpService }]
            }
        });
        testing_2.TestBed.compileComponents();
    });
    it('should create the app', testing_2.async(function () {
        var fixture = testing_2.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
