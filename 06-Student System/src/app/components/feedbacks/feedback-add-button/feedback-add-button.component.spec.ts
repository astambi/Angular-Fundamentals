import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAddButtonComponent } from './feedback-add-button.component';

describe('FeedbackAddButtonComponent', () => {
  let component: FeedbackAddButtonComponent;
  let fixture: ComponentFixture<FeedbackAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
