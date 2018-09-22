import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesListingComponent } from './user-courses-listing.component';

describe('UserCoursesListingComponent', () => {
  let component: UserCoursesListingComponent;
  let fixture: ComponentFixture<UserCoursesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoursesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoursesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
