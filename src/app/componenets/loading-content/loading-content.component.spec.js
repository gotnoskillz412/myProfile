"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var loading_content_component_1 = require('./loading-content.component');
var app_http_service_1 = require("../../app-http.service");
describe('LoadingContentComponent', function () {
    var component;
    var fixture;
    var event = {
        loading: true,
        route: '/test'
    };
    var testDestroy = false;
    var mockHttpServive = {
        httpRequest$: {
            subscribe: function (cb) {
                cb(event);
                return {
                    unsubscribe: function () {
                        testDestroy = true;
                    }
                };
            }
        }
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [loading_content_component_1.LoadingContentComponent]
        }).overrideComponent(loading_content_component_1.LoadingContentComponent, {
            set: {
                providers: [{ provide: app_http_service_1.AppHttpService, useValue: mockHttpServive }]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(loading_content_component_1.LoadingContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test the event listener as loading', function () {
        component.loadingArr = [];
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(1);
        expect(component.loadingArr[0]).toBe('/test');
        expect(component.loadingWheel).toBe(true);
    });
    it('should test the event listener as not loading', function () {
        component.loadingArr = ['/test'];
        event = {
            loading: false,
            route: '/test'
        };
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });
    it('should test the event listener as errored', function () {
        component.loadingArr = ['/test'];
        event = {
            loading: false,
            route: null
        };
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });
    it('should test ngOnDestroy', function () {
        event = {
            loading: false,
            route: null
        };
        component.ngOnInit();
        component.ngOnDestroy();
        expect(testDestroy).toBe(true);
    });
});
