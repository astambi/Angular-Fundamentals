import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddBtnComponent } from './course-add-btn.component';

describe('CourseAddBtnComponent', () => {
  let component: CourseAddBtnComponent;
  let fixture: ComponentFixture<CourseAddBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
