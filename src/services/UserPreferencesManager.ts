import { Branch } from "../models/Branch";
import { Environment } from "../models/Environment";

class EnvironmentPreferences {
  id: string;
  name: string;
  position: number;

  constructor(id: string, name: string, position: number) {
    this.id = id;
    this.name = name;
    this.position = position;
  }
}

class BranchPreferences {
  id: string;
  gitBranch: string;
  position: number;

  constructor(id: string, gitBranch:string, position: number) {
    this.id = id;
    this.gitBranch = gitBranch;
    this.position = position;
  }
}

class ProjectPreferences {
  id: string;
  branches: BranchPreferences[];
  environments: EnvironmentPreferences[];

  constructor(id: string) {
    this.id = id;
    this.branches = [];
    this.environments = [];
  }

  addBranch(branch: BranchPreferences): void {
    const existingBranch = this.branches.find((b) => b.id === branch.id);
    if (existingBranch) {
      existingBranch.position = branch.position;
    } else {
      this.branches.push(branch);
    }
    this.saveBranchOrder();
  }

  addEnvironment(environment: EnvironmentPreferences): void {
    const existingEnvironment = this.environments.find(
      (e) => e.id === environment.id,
    );
    if (existingEnvironment) {
      existingEnvironment.position = environment.position;
    } else {
      this.environments.push(environment);
    }
    this.saveEnvironmentOrder();
  }

  saveBranchOrder(): void {
    this.branches.sort((a, b) => a.position - b.position);
  }

  saveEnvironmentOrder(): void {
    this.environments.sort((a, b) => a.position - b.position);
  }
}

class UserPreferencesManager {
  private projects: ProjectPreferences[] = [];

  constructor() {
    this.loadPreferences();
  }

  loadPreferences(): void {
    const storedPreferences = localStorage.getItem("preferences");
    if (storedPreferences) {
      this.projects = JSON.parse(storedPreferences).map((projectData: any) => {
        const project = new ProjectPreferences(projectData.id);
        project.branches = projectData.branches.map((branchData: any) => {
          return new BranchPreferences(branchData.id, branchData.gitBranch, branchData.position);
        });
        project.environments = projectData.environments.map(
          (environmentData: any) => {
            return new EnvironmentPreferences(
              environmentData.id,
              environmentData.name,
              environmentData.position,
            );
          },
        );
        return project;
      });
    } else {
      this.projects = [];
    }
  }

  setBranchPosition(
    projectId: string,
    branchId: string,
    gitBranch: string,
    position: number,
  ): void {
    const project = this.projects.find((p) => p.id === projectId);
    if (project) {
      let branch = project.branches.find((b) => b.id === branchId);
      if (!branch) {
        branch = new BranchPreferences(branchId, gitBranch, position);
        project.addBranch(branch);
      } else {
        const oldPosition = branch.position;
        branch.position = position;
  
        // Update the positions of the other branches
        if (position < oldPosition) {
          // Moving the branch up
          project.branches
            .filter((b) => b.id !== branchId && b.position >= position && b.position < oldPosition)
            .forEach((b) => b.position++);
        } else {
          // Moving the branch down
          project.branches
            .filter((b) => b.id !== branchId && b.position > oldPosition && b.position <= position)
            .forEach((b) => b.position--);
        }
  
        project.saveBranchOrder();
      }
      this.saveProjectPreferences();
    }
  }  

  setEnvironmentPosition(
    projectId: string,
    environmentId: string,
    name: string,
    position: number,
  ): void {
    const project = this.projects.find((p) => p.id === projectId);
    if (project) {
      let environment = project.environments.find((b) => b.id === environmentId);
      if (!environment) {
        environment = new EnvironmentPreferences(environmentId, name, position);
        project.addEnvironment(environment);
      } else {
        const oldPosition = environment.position;
        environment.position = position;
  
        // Update the positions of the other environments
        if (position < oldPosition) {
          // Moving the environment up
          project.environments
            .filter((b) => b.id !== environmentId && b.position >= position && b.position < oldPosition)
            .forEach((b) => b.position++);
        } else {
          // Moving the environment down
          project.environments
            .filter((b) => b.id !== environmentId && b.position > oldPosition && b.position <= position)
            .forEach((b) => b.position--);
        }
  
        project.saveEnvironmentOrder();
      }
      this.saveProjectPreferences();
    }
  }

  getProjects(): ProjectPreferences[] {
    return this.projects;
  }

  private saveProjectPreferences(): void {
    console.log(`saving preferences ${JSON.stringify(this.projects)}`)
    localStorage.setItem("preferences", JSON.stringify(this.projects));
  }

  branchSort(projectId: string, a: Branch, b: Branch): number {
    var project = this.projects.find((p) => p.id === projectId);
    if (!project) {
      project = new ProjectPreferences(projectId);
      this.projects.push(project)
    }
    var branch1 = project.branches.find((p) => p.id === a.id);
    if (!branch1) {
        branch1 = new BranchPreferences(a.id, a.gitBranch, project.branches.length);
        // console.log(`creating branch1 ${JSON.stringify(branch1)}`)
        project.branches.push(branch1);
        this.saveProjectPreferences();
    }
    var branch2 = project.branches.find((p) => p.id === b.id);
    if (!branch2) {
        branch2 = new BranchPreferences(b.id, b.gitBranch, project.branches.length);
        // console.log(`creating branch2 ${JSON.stringify(branch2)}`)
        project.branches.push(branch2);
        this.saveProjectPreferences();
    }
    return branch1.position < branch2.position ? -1 : 1;
  }

  environmentSort(projectId: string, a: Environment, b: Environment): number {
    var project = this.projects.find((p) => p.id === projectId);
    if (!project) {
      project = new ProjectPreferences(projectId);
      this.projects.push(project)
    }
    var environment1 = project.environments.find((p) => p.id === a.id);
    if (!environment1) {
        environment1 = new EnvironmentPreferences(a.id, a.name, project.environments.length);
        // console.log(`creating environment1 ${JSON.stringify(environment1)}`)
        project.environments.push(environment1);
        this.saveProjectPreferences();
    }
    var environment2 = project.environments.find((p) => p.id === b.id);
    if (!environment2) {
        environment2 = new EnvironmentPreferences(b.id, b.name, project.environments.length);
        // console.log(`creating environment2 ${JSON.stringify(environment2)}`)
        project.environments.push(environment2);
        this.saveProjectPreferences();
    }
    return environment1.position < environment2.position ? -1 : 1;
  }

  deleteProjectPreferences(): void {
    localStorage.removeItem("preferences");
    this.projects = [];
  }
}

export default new UserPreferencesManager();
