export class UserViewModel {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public roles: Array<string>
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.roles = roles;
  }
}
