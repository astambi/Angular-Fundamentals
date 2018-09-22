export class FeedbackViewModel {
  constructor(
    public id: string,
    public courseId: string,
    public userId: string,
    public title: string,
    public description: string,
    // public courseName?: string,
    public userName?: string,
    public userEmail?: string
  ) {}
}
