import { FeedbacksModule } from './feedbacks.module';

describe('FeedbacksModule', () => {
  let feedbacksModule: FeedbacksModule;

  beforeEach(() => {
    feedbacksModule = new FeedbacksModule();
  });

  it('should create an instance', () => {
    expect(feedbacksModule).toBeTruthy();
  });
});
