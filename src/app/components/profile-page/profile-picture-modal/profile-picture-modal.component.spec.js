"use strict";
var testing_1 = require("@angular/core/testing");
var profile_picture_modal_component_1 = require("./profile-picture-modal.component");
var ng2_img_cropper_1 = require("ng2-img-cropper");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var account_service_1 = require("../../../helpers/account.service");
var option22_service_1 = require("../../../helpers/option22.service");
var helpers_service_1 = require("../../../helpers/helpers.service");
var profile_1 = require("../../../models/profile");
describe('ProfilePictureModalComponent', function () {
    var component;
    var fixture;
    var mockProfile;
    var updatePicture;
    var close;
    var MockDialogService = (function () {
        function MockDialogService() {
        }
        MockDialogService.prototype.removeDialog = function () {
            close = true;
        };
        return MockDialogService;
    }());
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.put = function () {
            return {
                toPromise: function () {
                    return Promise.resolve({ json: function () { return mockProfile; } });
                }
            };
        };
        return MockHttpService;
    }());
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.getProfile = function () {
            return Promise.resolve(mockProfile);
        };
        MockAccountService.prototype.updateProfilePicture = function () {
            updatePicture = true;
        };
        return MockAccountService;
    }());
    var MockHelpersService = (function () {
        function MockHelpersService() {
        }
        MockHelpersService.prototype.getAuthUri = function () {
            return Promise.resolve('authuri');
        };
        return MockHelpersService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [ng2_img_cropper_1.ImageCropperModule],
            declarations: [profile_picture_modal_component_1.ProfilePictureModalComponent],
            providers: [
                { provide: ng2_bootstrap_modal_1.DialogService, useClass: MockDialogService },
                { provide: account_service_1.AccountService, useClass: MockAccountService },
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: helpers_service_1.HelpersService, useClass: MockHelpersService }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        mockProfile = null;
        updatePicture = null;
        close = null;
        fixture = testing_1.TestBed.createComponent(profile_picture_modal_component_1.ProfilePictureModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test confirm', testing_1.fakeAsync(function () {
        mockProfile = new profile_1.Profile();
        mockProfile._id = 'blah';
        mockProfile.picture = 'test_picture';
        component.confirm();
        testing_1.tick();
        expect(updatePicture).toBe(true);
        expect(close).toBe(true);
    }));
});
