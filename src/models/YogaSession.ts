export class YogaSession {
  id: any;
  createdAt: any;
  updatedAt: any;
  sessionId: any;
  yogaUserId: any;
  yogaUser: any;

  constructor(data: any) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.sessionId = data.sessionId;
    this.yogaUserId = data.yogaUserId;
    this.yogaUser = data.yogaUser;
  }
}
