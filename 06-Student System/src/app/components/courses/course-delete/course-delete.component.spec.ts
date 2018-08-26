import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDeleteComponent } from './course-delete.component';

describe('CourseDeleteComponent', () => {
  let component: CourseDeleteComponent;
  let fixture: ComponentFixture<CourseDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
