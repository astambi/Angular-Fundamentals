export class CourseCreateModel {
  constructor(
    public name: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public trainerId: string,
    public trainer?: string,
    public students?: Array<any>
  ) {}
}
