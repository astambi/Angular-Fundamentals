import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbacksListingComponent } from './user-feedbacks-listing.component';

describe('UserFeedbacksListingComponent', () => {
  let component: UserFeedbacksListingComponent;
  let fixture: ComponentFixture<UserFeedbacksListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedbacksListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedbacksListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
