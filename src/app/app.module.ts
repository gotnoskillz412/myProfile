import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './componenets/login-page/login-page.component';
import {HomePageComponent} from './componenets/home-page/home-page.component';
import {RegisterPageComponent} from './componenets/register-page/register-page.component';
import {HttpServiceService} from './http-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
