export class CourseViewModel {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public trainers: Array<string>,
    public students?: Array<string>,
    public feedbacks?: Array<string>
  ) {}
}
