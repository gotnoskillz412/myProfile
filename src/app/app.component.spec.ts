/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {LoadingContentComponent} from "./componenets/loading-content/loading-content.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AppHttpService} from "./app-http.service";

describe('AppComponent', () => {
  let mockHttpService = {
    httpRequest$: {
      subscribe: (cb) => {
        cb(event);
        return {
          unsubscribe: () => {}
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
        providers: [{provide: AppHttpService, useValue: mockHttpService}]
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
