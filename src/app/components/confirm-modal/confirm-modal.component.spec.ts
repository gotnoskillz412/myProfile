/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ConfirmModalComponent} from './confirm-modal.component';
import {DialogService} from "ng2-bootstrap-modal";

let close = false;

class MockDialogService {
    removeDialog() {
        close = true;
    }
}


describe('ConfirmModalComponent', () => {
    let component: ConfirmModalComponent;
    let fixture: ComponentFixture<ConfirmModalComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmModalComponent],
            providers: [{provide: DialogService, useClass: MockDialogService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        close = false;
        fixture = TestBed.createComponent(ConfirmModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test the confirm function', <any>fakeAsync((): void => {
        let confirmed = false;
        component.confirmFunction = () => {
            confirmed = true;
            return Promise.resolve();
        };
        component.confirm();
        tick();
        expect(confirmed).toBe(true);
        expect(close).toBe(true);
    }));
});
