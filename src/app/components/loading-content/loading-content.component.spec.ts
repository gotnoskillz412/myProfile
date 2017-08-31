/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {LoadingContentComponent} from './loading-content.component';
import {Option22Service} from "../../helpers/option22.service";
import {Subscription} from "rxjs";
import {RequestEvent} from "../../models/requestEvent";

describe('LoadingContentComponent', () => {
    let component: LoadingContentComponent;
    let fixture: ComponentFixture<LoadingContentComponent>;
    let event;
    let testDestroy = false;

    class mockHttpService {
        httpRequest$ = {
            subscribe: (cb) => {
                cb(event);
                return {
                    unsubscribe: () => {
                        testDestroy = true;
                    }
                }
            }
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingContentComponent],
            providers: [{provide: Option22Service, useClass: mockHttpService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        event = new RequestEvent();
        fixture = TestBed.createComponent(LoadingContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test the event listener as loading, and then not loading', fakeAsync(() => {
        event.type = 'start';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.incoming.length).toBe(1);
        expect(component.incoming[0]).toBe(event.url);
        tick(600);
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

    it('should test a finish comes in without a start', () => {
        event.type = 'end';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.dontLoad.length).toBe(0);
        expect(component.incoming.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });

    it('should test the request finishes before 500 milliseconds', fakeAsync(() => {
        event.type = 'start';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.incoming.length).toBe(1);
        expect(component.incoming[0]).toBe(event.url);
        expect(component.loadingWheel).toBe(false);
        tick(100);

        event.type = 'end';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.dontLoad.length).toBe(1);
        expect(component.dontLoad[0]).toBe(event.url);
        expect(component.incoming.length).toBe(0);

        tick(500);
        expect(component.loadingArr.length).toBe(0);
        expect(component.dontLoad.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    }));

    it('should test an unknown event', () => {
        event.type = 'blah';
        event.url = 'testUrl';
        component.ngOnInit();
        expect(component.dontLoad.length).toBe(0);
        expect(component.incoming.length).toBe(0);
        expect(component.loadingArr.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });

    it('should test ngOnDestroy', () => {
        event.type = 'blah';
        event.url = 'testUrl';
        component.ngOnInit();
        component.ngOnDestroy();
        expect(testDestroy).toBe(true);
    });
});
