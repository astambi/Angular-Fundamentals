import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCourseButtonComponent } from './admin-create-course-button.component';

describe('AdminCreateCourseButtonComponent', () => {
  let component: AdminCreateCourseButtonComponent;
  let fixture: ComponentFixture<AdminCreateCourseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateCourseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCourseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
