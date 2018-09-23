import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDeleteButtonComponent } from './feedback-delete-button.component';

describe('FeedbackDeleteButtonComponent', () => {
  let component: FeedbackDeleteButtonComponent;
  let fixture: ComponentFixture<FeedbackDeleteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDeleteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
