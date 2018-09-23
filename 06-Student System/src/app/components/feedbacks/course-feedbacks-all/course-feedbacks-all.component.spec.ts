import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFeedbacksAllComponent } from './course-feedbacks-all.component';

describe('CourseFeedbacksAllComponent', () => {
  let component: CourseFeedbacksAllComponent;
  let fixture: ComponentFixture<CourseFeedbacksAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFeedbacksAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFeedbacksAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
