export class Environment {
  id: any;
  name: any;
  projectId: any;
  project: any;
  configId: any;
  config: any;
  claimedByUserId: any;
  claimedByUser: any;
  globalTimeTravel: any;
  notificationUrl: any;
  uploadLocation: any;
  downloadUrl: any;
  awsRegion: any;
  clientDownloadBucket: any;
  clientDownloadKey: any;
  warningMessage: any;
  createdAt: any;
  updatedAt: any;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.projectId = data.projectId;
    this.project = data.project;
    this.configId = data.configId;
    this.config = data.config;
    this.claimedByUserId = data.claimedByUserId;
    this.claimedByUser = data.claimedByUser;
    this.globalTimeTravel = data.globalTimeTravel;
    this.notificationUrl = data.notificationUrl;
    this.uploadLocation = data.uploadLocation;
    this.downloadUrl = data.downloadUrl;
    this.awsRegion = data.awsRegion;
    this.clientDownloadBucket = data.clientDownloadBucket;
    this.clientDownloadKey = data.clientDownloadKey;
    this.warningMessage = data.warningMessage;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
