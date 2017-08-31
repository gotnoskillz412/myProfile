"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var loading_content_component_1 = require("./loading-content.component");
var option22_service_1 = require("../../helpers/option22.service");
var requestEvent_1 = require("../../models/requestEvent");
describe('LoadingContentComponent', function () {
    var component;
    var fixture;
    var event;
    var testDestroy = false;
    var mockHttpService = (function () {
        function mockHttpService() {
            this.httpRequest$ = {
                subscribe: function (cb) {
                    cb(event);
                    return {
                        unsubscribe: function () {
                            testDestroy = true;
                        }
                    };
                }
            };
        }
        return mockHttpService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [loading_content_component_1.LoadingContentComponent],
            providers: [{ provide: option22_service_1.Option22Service, useClass: mockHttpService }]
        }).compileComponents();
    }));
    beforeEach(function () {
        event = new requestEvent_1.RequestEvent();
        fixture = testing_1.TestBed.createComponent(loading_content_component_1.LoadingContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test the event listener as loading, and then not loading', testing_1.fakeAsync(function () {
        event.type = 'start';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.incoming.length).toBe(1);
        expect(component.incoming[0]).toBe(event.url);
        testing_1.tick(600);
        expect(component.loadingArr.length).toBe(1);
        expect(component.loadingArr[0]).toBe(event.url);
        expect(component.loadingWheel).toBe(true);
        event.type = 'end';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.incoming.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    }));
    it('should test a finish comes in without a start', function () {
        event.type = 'end';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.dontLoad.length).toBe(0);
        expect(component.incoming.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });
    it('should test the request finishes before 500 milliseconds', testing_1.fakeAsync(function () {
        event.type = 'start';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.incoming.length).toBe(1);
        expect(component.incoming[0]).toBe(event.url);
        expect(component.loadingWheel).toBe(false);
        testing_1.tick(100);
        event.type = 'end';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.dontLoad.length).toBe(1);
        expect(component.dontLoad[0]).toBe(event.url);
        expect(component.incoming.length).toBe(0);
        testing_1.tick(500);
        expect(component.loadingArr.length).toBe(0);
        expect(component.dontLoad.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    }));
    it('should test an unknown event', function () {
        event.type = 'blah';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.dontLoad.length).toBe(0);
        expect(component.incoming.length).toBe(0);
        expect(component.loadingArr.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });
    it('should test ngOnDestroy', function () {
        event.type = 'blah';
        event.url = 'testUrl';
        component.ngOnInit();
        component.ngOnDestroy();
        expect(testDestroy).toBe(true);
    });
});
