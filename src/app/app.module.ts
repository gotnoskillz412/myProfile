import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AccountService} from './helpers/account.service';
import {AppComponent} from './app.component';
import {AuthService} from './helpers/auth.service';
import {HelpersService} from './helpers/helpers.service';
import {Option22Service} from './helpers/option22.service';
import {ContactPageComponent} from './componenets/contact-page/contact-page.component';
import {HomePageComponent} from './componenets/home-page/home-page.component';
import {LoadingContentComponent} from './componenets/loading-content/loading-content.component';
import {LoginPageComponent} from './componenets/login-page/login-page.component';
import MyErrorHandler from './helpers/myErrorHandler';
import {NavbarComponent} from './componenets/navbar/navbar.component';
import {ProfilePageComponent} from './componenets/profile-page/profile-page.component';
import {ProfilePageResolverService} from './componenets/profile-page/profile-page-resolver.service';
import {ProfilePictureModalComponent} from './componenets/profile-page/profile-picture-modal/profile-picture-modal.component';
import {RegisterPageComponent} from './componenets/register-page/register-page.component';

import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FileSelectDirective} from 'ng2-file-upload';
import {ImageCropperModule} from 'ng2-img-cropper';
import {SimpleNotificationsModule} from 'angular2-notifications';

import {ValidateEqualDirective} from './helpers/validate-equal.directive';
import {TagsComponent} from './componenets/tags/tags.component';
import {PasswordUpdateModalComponent} from './componenets/profile-page/password-update-modal/password-update-modal.component';
import {GoalsListPageComponent} from './componenets/goals-list-page/goals-list-page.component';
import {GoalsFormPageComponent} from './componenets/goals-form-page/goals-form-page.component';
import {GoalsListPageResolverService} from "./componenets/goals-list-page/goals-list-page-resolver.service";
import {GoalsFormPageResolverService} from "./componenets/goals-form-page/goals-form-page-resolver.service";
import {ConfirmModalComponent} from './componenets/confirm-modal/confirm-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        HomePageComponent,
        RegisterPageComponent,
        ContactPageComponent,
        ProfilePageComponent,
        LoadingContentComponent,
        FileSelectDirective,
        NavbarComponent,
        ProfilePictureModalComponent,
        ValidateEqualDirective,
        TagsComponent,
        PasswordUpdateModalComponent,
        GoalsListPageComponent,
        GoalsFormPageComponent,
        ConfirmModalComponent
    ],
    imports: [
        BsDropdownModule.forRoot(),
        BootstrapModalModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ImageCropperModule,
        SimpleNotificationsModule.forRoot(),
        RouterModule.forRoot([
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'register',
                component: RegisterPageComponent
            },
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'contact',
                component: ContactPageComponent
            },
            {
                path: 'goals',
                component: GoalsListPageComponent,
                resolve: {
                    goals: GoalsListPageResolverService
                }
            },
            {
                path: 'goals/:id',
                component: GoalsFormPageComponent,
                resolve: {
                    goal: GoalsFormPageResolverService
                }
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                resolve: {
                    profile: ProfilePageResolverService
                }
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ])
    ],
    providers: [
        AccountService,
        AuthService,
        Option22Service,
        HelpersService,
        ProfilePageResolverService,
        GoalsListPageResolverService,
        GoalsFormPageResolverService,
        {
            provide: ErrorHandler,
            useClass: MyErrorHandler
        }
    ],
    entryComponents: [ProfilePictureModalComponent, PasswordUpdateModalComponent, ConfirmModalComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
