/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {LoadingContentComponent} from "./components/loading-content/loading-content.component";
import {RouterTestingModule} from "@angular/router/testing";
import {Option22Service} from "./helpers/option22.service";

describe('AppComponent', () => {
    let mockHttpService = {
        httpRequest$: {
            subscribe: (cb) => {
                cb(event);
                return {
                    unsubscribe: () => {
                    }
                }
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [RouterTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).overrideComponent(LoadingContentComponent, {
            set: {
                providers: [{provide: Option22Service, useValue: mockHttpService}]
            }
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
