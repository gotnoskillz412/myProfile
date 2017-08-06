/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {LoadingContentComponent} from './loading-content.component';
import {AppHttpService} from "../../helpers/option22.service";
import {Subscription} from "rxjs";

describe('LoadingContentComponent', () => {
    let component: LoadingContentComponent;
    let fixture: ComponentFixture<LoadingContentComponent>;
    let event = {
        loading: true,
        route: '/test'
    };
    let testDestroy = false;

    let mockHttpServive = {
        httpRequest$: {
            subscribe: (cb) => {
                cb(event);
                return {
                    unsubscribe: () => {
                        testDestroy = true;
                    }
                }
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingContentComponent]
        }).overrideComponent(LoadingContentComponent, {
            set: {
                providers: [{provide: AppHttpService, useValue: mockHttpServive}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test the event listener as loading', () => {
        component.loadingArr = [];
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(1);
        expect(component.loadingArr[0]).toBe('/test');
        expect(component.loadingWheel).toBe(true);
    });

    it('should test the event listener as not loading', () => {
        component.loadingArr = ['/test'];
        event = {
            loading: false,
            route: '/test'
        };
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });

    it('should test the event listener as errored', () => {
        component.loadingArr = ['/test'];
        event = {
            loading: false,
            route: null
        };
        component.ngOnInit();
        expect(component.loadingArr.length).toBe(0);
        expect(component.loadingWheel).toBe(false);
    });

    it('should test ngOnDestroy', () => {
        event = {
            loading: false,
            route: null
        };
        component.ngOnInit();
        component.ngOnDestroy();
        expect(testDestroy).toBe(true);
    });
});
