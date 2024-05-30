export class Install {
  id: any;
  yogaUserId: any;
  yogaUser: any;
  createdAt: any;
  updatedAt: any;

  constructor(data: any) {
    this.id = data.id;
    this.yogaUserId = data.yogaUserId;
    this.yogaUser = data.yogaUser;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
