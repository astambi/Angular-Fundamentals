import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInfoListingComponent } from './course-info-listing.component';

describe('CourseInfoListingComponent', () => {
  let component: CourseInfoListingComponent;
  let fixture: ComponentFixture<CourseInfoListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInfoListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInfoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
