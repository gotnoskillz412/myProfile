"use strict";
/* tslint:disable:no-unused-variable */
var router_1 = require("@angular/router");
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var account_1 = require("../../models/account");
var account_service_1 = require("../../helpers/account.service");
var dist_1 = require("angular2-notifications/dist");
var profile_1 = require("../../models/profile");
var profile_page_component_1 = require("./profile-page.component");
var profile_page_service_1 = require("./profile-page.service");
var tags_component_1 = require("../tags/tags.component");
describe('ProfilePageComponent', function () {
    var component;
    var fixture;
    var mockData;
    var mockAccount;
    var notificationSuccess;
    var updatePicture;
    var mockProfile = new profile_1.Profile();
    mockProfile.likes = [];
    mockProfile.firstName = 'Spencer';
    mockProfile.lastName = 'Hockeborn';
    mockProfile.picture = 'test_picture';
    mockProfile.description = null;
    var MockActivatedRoute = (function () {
        function MockActivatedRoute() {
            this.snapshot = {
                data: {
                    profile: mockProfile
                }
            };
        }
        return MockActivatedRoute;
    }());
    var MockProfilePageService = (function () {
        function MockProfilePageService() {
        }
        MockProfilePageService.prototype.updateProfile = function () {
            return {
                then: function (cb) {
                    cb(mockProfile);
                    return {
                        'catch': function (ecb) {
                            ecb();
                        }
                    };
                }
            };
        };
        MockProfilePageService.prototype.updateAccount = function () {
            return {
                then: function (cb) {
                    cb(mockAccount);
                    return {
                        'catch': function (ecb) {
                            ecb();
                        }
                    };
                }
            };
        };
        return MockProfilePageService;
    }());
    var MockDialogService = (function () {
        function MockDialogService() {
        }
        MockDialogService.prototype.addDialog = function () {
            return {
                subscribe: function (cb) {
                    cb(mockData);
                }
            };
        };
        return MockDialogService;
    }());
    var MockNotificationsService = (function () {
        function MockNotificationsService() {
        }
        MockNotificationsService.prototype.success = function () {
            notificationSuccess = true;
        };
        return MockNotificationsService;
    }());
    var MockAccountsService = (function () {
        function MockAccountsService() {
        }
        MockAccountsService.prototype.getProfile = function () {
            return {
                then: function (cb) {
                    cb(mockProfile);
                }
            };
        };
        MockAccountsService.prototype.getAccount = function () {
            return {
                then: function (cb) {
                    cb(mockAccount);
                }
            };
        };
        MockAccountsService.prototype.updateProfilePicture = function (up) {
            updatePicture = up;
        };
        return MockAccountsService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, router_1.RouterModule],
            declarations: [profile_page_component_1.ProfilePageComponent, tags_component_1.TagsComponent],
            providers: [
                { provide: router_1.ActivatedRoute, useClass: MockActivatedRoute },
                { provide: ng2_bootstrap_modal_1.DialogService, useClass: MockDialogService },
                { provide: dist_1.NotificationsService, useClass: MockNotificationsService },
                { provide: account_service_1.AccountService, useClass: MockAccountsService }
            ]
        }).overrideComponent(profile_page_component_1.ProfilePageComponent, {
            set: {
                providers: [{ provide: profile_page_service_1.ProfilePageService, useClass: MockProfilePageService }]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        mockData = null;
        mockAccount = null;
        notificationSuccess = null;
        updatePicture = null;
        fixture = testing_1.TestBed.createComponent(profile_page_component_1.ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test ngOnInit', function () {
        component.ngOnInit();
        expect(component.data.image).toBe('test_picture');
        expect(updatePicture).toBe('test_picture');
    });
    it('should test addLike and removeLike', function () {
        component.ngOnInit();
        component.addLike('');
        expect(component.profile.likes.length).toBe(0);
        component.addLike('test');
        expect(component.profile.likes.length).toBe(1);
        expect(component.profile.likes[0]).toBe('test');
        component.removeLike()(0);
        expect(component.profile.likes.length).toBe(0);
        component.removeLike()(0);
        expect(component.profile.likes.length).toBe(0);
    });
    it('should test loadAboutMeInfo', function () {
        component.infoSection = null;
        component.profile = null;
        component.loadAboutMeInfo();
        expect(component.profile.firstName).toBe(mockProfile.firstName);
        expect(component.infoSection).toBe(component.sections.aboutMe);
    });
    it('should test loadSecurityInfo', function () {
        mockAccount = new account_1.Account();
        mockAccount.email = 'blah@blah.com';
        mockAccount.username = 'blah';
        component.infoSection = null;
        component.account = null;
        component.loadSecurityInfo();
        expect(component.account.email).toBe(mockAccount.email);
        expect(component.account.username).toBe(mockAccount.username);
        expect(component.infoSection).toBe(component.sections.security);
    });
    it('should test openPasswordModal', function () {
        mockData = new account_1.Account();
        mockData.username = 'blah';
        component.openPasswordModal();
        expect(component.account.username).toBe('blah');
        expect(notificationSuccess).toBe(true);
    });
    it('should test openDialog', function () {
        mockData = 'test';
        component.openDialog();
        expect(component.data).toBe('test');
        expect(notificationSuccess).toBe(true);
    });
    it('should test updateAccount', function () {
        component.account = new account_1.Account();
        component.account.email = 'first';
        mockAccount = new account_1.Account();
        mockAccount.email = 'second';
        component.updateAccount();
        expect(component.account.email).toBe('second');
    });
    it('should test updateProfile', function () {
        component.profile = new profile_1.Profile();
        component.profile.firstName = 'first';
        component.updateProfile();
        expect(component.profile.firstName).toBe('Spencer');
    });
});
