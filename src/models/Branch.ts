export class Branch {
  id: any;
  createdAt: any;
  updatedAt: any;
  name: any;
  gitBranch: any;
  project: any;
  projectId: any;
  configs: any;

  constructor(data: any) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.gitBranch = data.gitBranch;
    this.project = data.project;
    this.projectId = data.projectId;
    this.configs = data.configs;
  }
}
