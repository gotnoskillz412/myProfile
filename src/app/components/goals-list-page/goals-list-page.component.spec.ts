import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsListPageComponent } from './goals-list-page.component';

describe('GoalsListPageComponent', () => {
  let component: GoalsListPageComponent;
  let fixture: ComponentFixture<GoalsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
