export class YogaUser {
  id: any;
  createdAt: any;
  updatedAt: any;
  yogaSessions: any;
  installs: any;

  constructor(data: any) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.yogaSessions = data.yogaSessions;
    this.installs = data.installs;
  }
}
