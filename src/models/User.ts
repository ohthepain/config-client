export class User {
  id: any;
  password: any;
  email: any;
  environments: any;
  createdAt: any;
  updatedAt: any;
  roles: any;
  configs: any;

  constructor(data: any) {
    this.id = data.id;
    this.password = data.password;
    this.email = data.email;
    this.environments = data.environments;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.roles = data.roles;
    this.configs = data.configs;
  }
}
