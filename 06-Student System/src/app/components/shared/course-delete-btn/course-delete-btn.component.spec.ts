import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDeleteBtnComponent } from './course-delete-btn.component';

describe('CourseDeleteBtnComponent', () => {
  let component: CourseDeleteBtnComponent;
  let fixture: ComponentFixture<CourseDeleteBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDeleteBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDeleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
