import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksAllComponent } from './feedbacks-all.component';

describe('FeedbacksAllComponent', () => {
  let component: FeedbacksAllComponent;
  let fixture: ComponentFixture<FeedbacksAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacksAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
