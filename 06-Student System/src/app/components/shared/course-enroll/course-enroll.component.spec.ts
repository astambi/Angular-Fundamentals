import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollComponent } from './course-enroll.component';

describe('CourseEnrollComponent', () => {
  let component: CourseEnrollComponent;
  let fixture: ComponentFixture<CourseEnrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEnrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
