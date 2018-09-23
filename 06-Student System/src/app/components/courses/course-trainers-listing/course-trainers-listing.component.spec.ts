import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTrainersListingComponent } from './course-trainers-listing.component';

describe('CourseTrainersListingComponent', () => {
  let component: CourseTrainersListingComponent;
  let fixture: ComponentFixture<CourseTrainersListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTrainersListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTrainersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
