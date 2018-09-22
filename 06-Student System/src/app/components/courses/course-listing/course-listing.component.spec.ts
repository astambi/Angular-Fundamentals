import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListingComponent } from './course-listing.component';

describe('CourseListingComponent', () => {
  let component: CourseListingComponent;
  let fixture: ComponentFixture<CourseListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
