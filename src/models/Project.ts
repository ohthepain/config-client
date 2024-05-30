export class Project {
  id: any;
  name: any;
  //: any;
  branches: any;
  gitRepo: any;
  bucket: any;
  createdAt: any;
  updatedAt: any;
  environments: any;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.// = data.//;
    this.branches = data.branches;
    this.gitRepo = data.gitRepo;
    this.bucket = data.bucket;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.environments = data.environments;
  }
}
