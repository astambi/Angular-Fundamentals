import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAdministrationComponent } from './course-administration.component';

describe('CourseAdministrationComponent', () => {
  let component: CourseAdministrationComponent;
  let fixture: ComponentFixture<CourseAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
