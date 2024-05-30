export class Environment {
  id: any;
  name: any;
  projectId: any;
  project: any;
  configId: any;
  config: any;
  status: any;
  claimedByUserId: any;
  claimedByUser: any;
  globalTimeTravel: any;
  notificationUrl: any;
  uploadLocation: any;
  downloadUrl: any;
  clientDownloadBucket: any;
  clientDownloadKey: any;
  awsAccessKey: any;
  awsSecretKey: any;
  createdAt: any;
  updatedAt: any;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.projectId = data.projectId;
    this.project = data.project;
    this.configId = data.configId;
    this.config = data.config;
    this.status = data.status;
    this.claimedByUserId = data.claimedByUserId;
    this.claimedByUser = data.claimedByUser;
    this.globalTimeTravel = data.globalTimeTravel;
    this.notificationUrl = data.notificationUrl;
    this.uploadLocation = data.uploadLocation;
    this.downloadUrl = data.downloadUrl;
    this.clientDownloadBucket = data.clientDownloadBucket;
    this.clientDownloadKey = data.clientDownloadKey;
    this.awsAccessKey = data.awsAccessKey;
    this.awsSecretKey = data.awsSecretKey;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
