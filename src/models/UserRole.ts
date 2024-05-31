export class UserRole {
  userId: any;
  roleId: any;
  user: any;
  role: any;

  constructor(data: any) {
    this.userId = data.userId;
    this.roleId = data.roleId;
    this.user = data.user;
    this.role = data.role;
  }
}
