import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditBtnComponent } from './course-edit-btn.component';

describe('CourseEditBtnComponent', () => {
  let component: CourseEditBtnComponent;
  let fixture: ComponentFixture<CourseEditBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
