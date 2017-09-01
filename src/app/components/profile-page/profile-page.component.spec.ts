/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ProfilePageService} from "./profile-page.service";
import {Profile} from "../../models/profile";
import {ActivatedRoute, ActivatedRouteSnapshot, RouterModule} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {NotificationsService} from "angular2-notifications/dist";
import {AccountService} from "../../helpers/account.service";
import {FormsModule} from "@angular/forms";
import {TagsComponent} from "../tags/tags.component";
import {Observable} from "rxjs/Observable";
import {Account} from "../../models/account";

describe('ProfilePageComponent', () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;
    let mockData;
    let mockAccount;
    let notificationSuccess;
    let updatePicture;

    let mockProfile = new Profile();
    mockProfile.likes = [];
    mockProfile.firstName = 'Spencer';
    mockProfile.lastName = 'Hockeborn';
    mockProfile.picture = 'test_picture';
    mockProfile.description = null;

    class MockActivatedRoute {
        snapshot = {
            data: {
                profile: mockProfile
            }
        };
    }

    class MockProfilePageService {
        updateProfile() {
            return {
                then: (cb) => {
                    cb(mockProfile);
                    return {
                        'catch': (ecb) => {
                            ecb();
                        }
                    }
                }
            };
        }

        updateAccount() {
            return {
                then: (cb) => {
                    cb(mockAccount);
                    return {
                        'catch': (ecb) => {
                            ecb();
                        }
                    }
                }
            };
        }
    }

    class MockDialogService {
        addDialog() {
            return {
                subscribe: (cb) => {
                    cb(mockData);
                }
            };
        }
    }

    class MockNotificationsService {
        success() {
            notificationSuccess = true;
        }
    }

    class MockAccountsService {
        getProfile() {
            return {
                then: (cb) => {
                    cb(mockProfile);
                }
            };
        }

        getAccount() {
            return {
                then: (cb) => {
                    cb(mockAccount);
                }
            };
        }

        updateProfilePicture(up) {
            updatePicture = up;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterModule],
            declarations: [ProfilePageComponent, TagsComponent],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: DialogService, useClass: MockDialogService},
                {provide: NotificationsService, useClass: MockNotificationsService},
                {provide: AccountService, useClass: MockAccountsService}
            ]
        }).overrideComponent(ProfilePageComponent, {
            set: {
                providers: [{provide: ProfilePageService, useClass: MockProfilePageService}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        mockData = null;
        mockAccount = null;
        notificationSuccess = null;
        updatePicture = null;
        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test ngOnInit', () => {
        component.ngOnInit();
        expect(component.data.image).toBe('test_picture');
        expect(updatePicture).toBe('test_picture');
    });

    it('should test addLike and removeLike', () => {
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

    it('should test loadAboutMeInfo', () => {
       component.infoSection = null;
       component.profile = null;
       component.loadAboutMeInfo();
       expect(component.profile.firstName).toBe(mockProfile.firstName);
       expect(component.infoSection).toBe(component.sections.aboutMe);
    });

    it('should test loadSecurityInfo', () => {
        mockAccount = new Account();
        mockAccount.email = 'blah@blah.com';
        mockAccount.username = 'blah';
        component.infoSection = null;
        component.account = null;
        component.loadSecurityInfo();
        expect(component.account.email).toBe(mockAccount.email);
        expect(component.account.username).toBe(mockAccount.username);
        expect(component.infoSection).toBe(component.sections.security);
    });

    it('should test openPasswordModal', () => {
        mockData = new Account();
        mockData.username = 'blah';
        component.openPasswordModal();
        expect(component.account.username).toBe('blah');
        expect(notificationSuccess).toBe(true);
    });

    it('should test openDialog', () => {
        mockData = 'test';
        component.openDialog();
        expect(component.data).toBe('test');
        expect(notificationSuccess).toBe(true);
    });

    it('should test updateAccount', () => {
        component.account = new Account();
        component.account.email = 'first';
        mockAccount = new Account();
        mockAccount.email = 'second';
        component.updateAccount();
        expect(component.account.email).toBe('second');
    });

    it('should test updateProfile', () => {
        component.profile = new Profile();
        component.profile.firstName = 'first';
        component.updateProfile();
        expect(component.profile.firstName).toBe('Spencer');
    });
});
