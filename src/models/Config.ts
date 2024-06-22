import { Environment } from "./Environment";

export class Config {
  id: any;
  status: any;
  projectId: any;
  branch: any;
  branchId: any;
  environments: Environment[];
  userId: any;
  user: any;
  notes: any;
  gitHash: any;
  downloadUrl: any;
  checksumMd5: any;
  createdAt: any;
  updatedAt: any;

  constructor(data: any) {
    this.id = data.id;
    this.status = data.status;
    this.projectId = data.projectId;
    this.branch = data.branch;
    this.branchId = data.branchId;
    this.environments = data.environments;
    this.userId = data.userId;
    this.user = data.user;
    this.notes = data.notes;
    this.gitHash = data.gitHash;
    this.downloadUrl = data.downloadUrl;
    this.checksumMd5 = data.checksumMd5;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
