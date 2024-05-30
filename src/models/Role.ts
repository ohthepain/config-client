export class Role {
  name: any;
  users: any;

  constructor(data: any) {
    this.name = data.name;
    this.users = data.users;
  }
}
