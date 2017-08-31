"use strict";
var testing_1 = require("@angular/core/testing");
var confirm_modal_component_1 = require("./confirm-modal.component");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var close = false;
var MockDialogService = (function () {
    function MockDialogService() {
    }
    MockDialogService.prototype.removeDialog = function () {
        close = true;
    };
    return MockDialogService;
}());
describe('ConfirmModalComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [confirm_modal_component_1.ConfirmModalComponent],
            providers: [{ provide: ng2_bootstrap_modal_1.DialogService, useClass: MockDialogService }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        close = false;
        fixture = testing_1.TestBed.createComponent(confirm_modal_component_1.ConfirmModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test the confirm function', testing_1.fakeAsync(function () {
        var confirmed = false;
        component.confirmFunction = function () {
            confirmed = true;
            return Promise.resolve();
        };
        component.confirm();
        testing_1.tick();
        expect(confirmed).toBe(true);
        expect(close).toBe(true);
    }));
});
