import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdateModalComponent } from './password-update-modal.component';

describe('PasswordUpdateModalComponent', () => {
  let component: PasswordUpdateModalComponent;
  let fixture: ComponentFixture<PasswordUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
