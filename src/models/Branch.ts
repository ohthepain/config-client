export class Branch {
  id: any;
  createdAt: any;
  updatedAt: any;
  gitBranch: any;
  project: any;
  projectId: any;
  configs: any;

  constructor(data: any) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.gitBranch = data.gitBranch;
    this.project = data.project;
    this.projectId = data.projectId;
    this.configs = data.configs;
  }
}
