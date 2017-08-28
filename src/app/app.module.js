"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("./helpers/account.service");
var app_component_1 = require("./app.component");
var auth_service_1 = require("./helpers/auth.service");
var helpers_service_1 = require("./helpers/helpers.service");
var option22_service_1 = require("./helpers/option22.service");
var contact_page_component_1 = require("./components/contact-page/contact-page.component");
var home_page_component_1 = require("./components/home-page/home-page.component");
var loading_content_component_1 = require("./components/loading-content/loading-content.component");
var login_page_component_1 = require("./components/login-page/login-page.component");
var myErrorHandler_1 = require("./helpers/myErrorHandler");
var navbar_component_1 = require("./components/navbar/navbar.component");
var profile_page_component_1 = require("./components/profile-page/profile-page.component");
var profile_page_resolver_service_1 = require("./components/profile-page/profile-page-resolver.service");
var profile_picture_modal_component_1 = require("./components/profile-page/profile-picture-modal/profile-picture-modal.component");
var register_page_component_1 = require("./components/register-page/register-page.component");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var dropdown_1 = require("ngx-bootstrap/dropdown");
// import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
var angular2_focus_1 = require("angular2-focus");
var ng2_img_cropper_1 = require("ng2-img-cropper");
var angular2_notifications_1 = require("angular2-notifications");
var validate_equal_directive_1 = require("./helpers/validate-equal.directive");
var tags_component_1 = require("./components/tags/tags.component");
var password_update_modal_component_1 = require("./components/profile-page/password-update-modal/password-update-modal.component");
var goals_list_page_component_1 = require("./components/goals-list-page/goals-list-page.component");
var goals_form_page_component_1 = require("./components/goals-form-page/goals-form-page.component");
var goals_list_page_resolver_service_1 = require("./components/goals-list-page/goals-list-page-resolver.service");
var goals_form_page_resolver_service_1 = require("./components/goals-form-page/goals-form-page-resolver.service");
var confirm_modal_component_1 = require("./components/confirm-modal/confirm-modal.component");
var ng2_file_upload_1 = require("ng2-file-upload");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            login_page_component_1.LoginPageComponent,
            home_page_component_1.HomePageComponent,
            register_page_component_1.RegisterPageComponent,
            contact_page_component_1.ContactPageComponent,
            profile_page_component_1.ProfilePageComponent,
            loading_content_component_1.LoadingContentComponent,
            navbar_component_1.NavbarComponent,
            profile_picture_modal_component_1.ProfilePictureModalComponent,
            validate_equal_directive_1.ValidateEqualDirective,
            tags_component_1.TagsComponent,
            password_update_modal_component_1.PasswordUpdateModalComponent,
            goals_list_page_component_1.GoalsListPageComponent,
            goals_form_page_component_1.GoalsFormPageComponent,
            confirm_modal_component_1.ConfirmModalComponent
        ],
        imports: [
            dropdown_1.BsDropdownModule.forRoot(),
            ng2_bootstrap_modal_1.BootstrapModalModule,
            animations_1.BrowserAnimationsModule,
            ng2_file_upload_1.FileUploadModule,
            angular2_focus_1.FocusModule.forRoot(),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            ng2_img_cropper_1.ImageCropperModule,
            angular2_notifications_1.SimpleNotificationsModule.forRoot(),
            router_1.RouterModule.forRoot([
                {
                    path: 'login',
                    component: login_page_component_1.LoginPageComponent
                },
                {
                    path: 'register',
                    component: register_page_component_1.RegisterPageComponent
                },
                {
                    path: 'home',
                    component: home_page_component_1.HomePageComponent
                },
                {
                    path: 'contact',
                    component: contact_page_component_1.ContactPageComponent
                },
                {
                    path: 'goals',
                    component: goals_list_page_component_1.GoalsListPageComponent,
                    resolve: {
                        goals: goals_list_page_resolver_service_1.GoalsListPageResolverService
                    }
                },
                {
                    path: 'goals/:id',
                    component: goals_form_page_component_1.GoalsFormPageComponent,
                    resolve: {
                        goal: goals_form_page_resolver_service_1.GoalsFormPageResolverService
                    }
                },
                {
                    path: 'profile',
                    component: profile_page_component_1.ProfilePageComponent,
                    resolve: {
                        profile: profile_page_resolver_service_1.ProfilePageResolverService
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
            account_service_1.AccountService,
            auth_service_1.AuthService,
            option22_service_1.Option22Service,
            helpers_service_1.HelpersService,
            profile_page_resolver_service_1.ProfilePageResolverService,
            goals_list_page_resolver_service_1.GoalsListPageResolverService,
            goals_form_page_resolver_service_1.GoalsFormPageResolverService,
            {
                provide: core_1.ErrorHandler,
                useClass: myErrorHandler_1.MyErrorHandler
            }
        ],
        entryComponents: [profile_picture_modal_component_1.ProfilePictureModalComponent, password_update_modal_component_1.PasswordUpdateModalComponent, confirm_modal_component_1.ConfirmModalComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
