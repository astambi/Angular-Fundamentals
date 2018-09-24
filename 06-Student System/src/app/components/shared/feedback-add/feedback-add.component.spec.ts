import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAddComponent } from './feedback-add.component';

describe('FeedbackAddComponent', () => {
  let component: FeedbackAddComponent;
  let fixture: ComponentFixture<FeedbackAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
