export class FeedbackCreateModel {
  constructor(
    public courseId: string,
    public userId: string,
    public title: string,
    public description: string
  ) {}
}
