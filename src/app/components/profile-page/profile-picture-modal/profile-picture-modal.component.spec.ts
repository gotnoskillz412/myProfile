import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ProfilePictureModalComponent} from './profile-picture-modal.component';
import {ImageCropperModule} from "ng2-img-cropper";
import {DialogService} from "ng2-bootstrap-modal";
import {AccountService} from "../../../helpers/account.service";
import {Option22Service} from "../../../helpers/option22.service";
import {HelpersService} from "../../../helpers/helpers.service";
import {Profile} from "../../../models/profile";

describe('ProfilePictureModalComponent', () => {
    let component: ProfilePictureModalComponent;
    let fixture: ComponentFixture<ProfilePictureModalComponent>;
    let mockProfile;
    let updatePicture;
    let close;

    class MockDialogService {
        removeDialog() {
            close = true;
        }
    }

    class MockHttpService {
        put() {
            return {
                toPromise: () => {
                    return Promise.resolve({json: () => {return mockProfile;}});
                }
            }
        }
    }

    class MockAccountService {
        getProfile() {
            return Promise.resolve(mockProfile);
        }

        updateProfilePicture() {
            updatePicture = true;
        }
    }

    class MockHelpersService {
        getAuthUri() {
            return Promise.resolve('authuri');
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ImageCropperModule],
            declarations: [ProfilePictureModalComponent],
            providers: [
                {provide: DialogService, useClass: MockDialogService},
                {provide: AccountService, useClass: MockAccountService},
                {provide: Option22Service, useClass: MockHttpService},
                {provide: HelpersService, useClass: MockHelpersService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        mockProfile = null;
        updatePicture = null;
        close = null;
        fixture = TestBed.createComponent(ProfilePictureModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test confirm', fakeAsync(() => {
        mockProfile = new Profile();
        mockProfile._id = 'blah';
        mockProfile.picture = 'test_picture';
        component.confirm();
        tick();
        expect(updatePicture).toBe(true);
        expect(close).toBe(true);
    }));
});
