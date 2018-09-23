import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbacksAllComponent } from './user-feedbacks-all.component';

describe('UserFeedbacksAllComponent', () => {
  let component: UserFeedbacksAllComponent;
  let fixture: ComponentFixture<UserFeedbacksAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedbacksAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedbacksAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
