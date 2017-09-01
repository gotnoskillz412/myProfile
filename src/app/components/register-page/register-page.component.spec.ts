/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {RegisterPageComponent} from './register-page.component';
import {RegisterPageService} from "./register-page.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {NotificationsService} from "angular2-notifications/dist";

describe('RegisterPageComponent', () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;
    let resultUrl;
    let notificationSuccess;

    class MockRegisterPageService {
        registerAccount() {
            return Promise.resolve();
        }
    }

    class MockRouter {
        navigate(url) {
            resultUrl = url[0];
        }
    }

    class MockNotificationsService {
        success() {
            notificationSuccess = true;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RegisterPageComponent],
            providers: [
                {provide: Router, useClass: MockRouter},
                {provide: NotificationsService, useClass: MockNotificationsService}
            ]
        }).overrideComponent(RegisterPageComponent, {
            set: {
                providers: [{provide: RegisterPageService, useClass: MockRegisterPageService}]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        resultUrl = null;
        notificationSuccess = null;
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
    });

    it('should test onSubmit', fakeAsync(() => {
        component.onSubmit();
        tick();
        expect(notificationSuccess).toBe(true);
        expect(resultUrl).toBe('/goals');
    }));
});
