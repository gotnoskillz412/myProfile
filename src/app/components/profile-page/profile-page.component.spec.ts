/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ProfilePageService} from "./profile-page.service";

describe('ProfilePageComponent', () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;

    let mockProfilePageService = {
        testCredentials: () => {
            return {
                then: (cb) => {
                    cb();
                }
            };
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilePageComponent]
        }).overrideComponent(ProfilePageComponent, {
            set: {
                providers: [{provide: ProfilePageService, useValue: mockProfilePageService}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test ngOnInit', () => {
        component.ngOnInit();
    });
});
