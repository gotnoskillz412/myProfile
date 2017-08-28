import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsFormPageComponent } from './goals-form-page.component';

describe('GoalsFormPageComponent', () => {
  let component: GoalsFormPageComponent;
  let fixture: ComponentFixture<GoalsFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
