export class UserViewModel {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public roles: Array<string>,
    public studentCourses?: Array<any>,
    public trainerCourses?: Array<any>
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.roles = roles;
  }
}
