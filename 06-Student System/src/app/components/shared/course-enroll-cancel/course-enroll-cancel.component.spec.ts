import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollCancelComponent } from './course-enroll-cancel.component';

describe('CourseEnrollCancelComponent', () => {
  let component: CourseEnrollCancelComponent;
  let fixture: ComponentFixture<CourseEnrollCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEnrollCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnrollCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
