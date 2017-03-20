"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var profile_page_component_1 = require('./profile-page.component');
var profile_page_service_1 = require("./profile-page.service");
describe('ProfilePageComponent', function () {
    var component;
    var fixture;
    var mockProfilePageService = {
        testCredentials: function () {
            return {
                then: function (cb) {
                    cb();
                }
            };
        }
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [profile_page_component_1.ProfilePageComponent]
        }).overrideComponent(profile_page_component_1.ProfilePageComponent, {
            set: {
                providers: [{ provide: profile_page_service_1.ProfilePageService, useValue: mockProfilePageService }]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(profile_page_component_1.ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test ngOnInit', function () {
        component.ngOnInit();
        expect(component.loaded).toBe(true);
    });
});
