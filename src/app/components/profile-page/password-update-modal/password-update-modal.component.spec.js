"use strict";
var testing_1 = require("@angular/core/testing");
var password_update_modal_component_1 = require("./password-update-modal.component");
var account_1 = require("../../../models/account");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var profile_page_service_1 = require("../profile-page.service");
var forms_1 = require("@angular/forms");
describe('PasswordUpdateModalComponent', function () {
    var component;
    var fixture;
    var close = false;
    var mockAccount = new account_1.Account();
    mockAccount._id = 'blah';
    var MockProfilePageService = (function () {
        function MockProfilePageService() {
        }
        MockProfilePageService.prototype.updatePassword = function () {
            return Promise.resolve(mockAccount);
        };
        return MockProfilePageService;
    }());
    var MockDialogService = (function () {
        function MockDialogService() {
        }
        MockDialogService.prototype.removeDialog = function () {
            close = true;
        };
        return MockDialogService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [password_update_modal_component_1.PasswordUpdateModalComponent],
            providers: [
                { provide: ng2_bootstrap_modal_1.DialogService, useClass: MockDialogService }
            ]
        }).overrideComponent(password_update_modal_component_1.PasswordUpdateModalComponent, {
            set: {
                providers: [{ provide: profile_page_service_1.ProfilePageService, useClass: MockProfilePageService }]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(password_update_modal_component_1.PasswordUpdateModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', testing_1.fakeAsync(function () {
        component.account = mockAccount;
        component.passwords = null;
        component.confirm();
        testing_1.tick();
        expect(close).toBe(true);
    }));
});
