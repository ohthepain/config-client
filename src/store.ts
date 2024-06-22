import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Project } from "./models/Project";
import { Branch } from "./models/Branch";
import { Environment } from "./models/Environment";
import { Config } from "./models/Config";

interface StoreState {
  // subscribe: (listener: any) => any;
  token: string | null;
  email: string | null;
  password: string | null;
  githubAccount: string | null;
  githubAccessToken: string | null;
  // projectId: string | null;
  // idk if this is a good idea - maybe use a getter instead?
  editAccount: boolean;
  setEditAccount: (editAccount: boolean) => void;
  project: Project | null;
  editProject: boolean;
  projects: Project[];
  branchId: string | null;
  // environmentId: string | null;
  branch: Branch | null;
  branches: Branch[];
  environment: Environment | undefined;
  environments: Environment[];
  configId: string | null;
  config: Config | null;
  setToken: (token: string | null) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setGithubAccount: (account: string | null) => void;
  setGithubAccessToken: (token: string | null) => void;
  // setEnvironmentId: (environmentId: string | null) => void;
  setEnvironment: (environment: Environment | undefined) => void;
  setEnvironments: (environments: Environment[]) => void;
  addEnvironment: (environment: Environment) => void;
  updateEnvironment: (environment: Environment) => void;
  deleteEnvironment: (environmentId: string) => void;
  // setProjectId: (projectId: string | null) => void;
  setProject: (project: Project | undefined) => void;
  setEditProject: (editProject: boolean) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  // setBranchId: (branchId: string | null) => void;
  setBranch: (branch: Branch | undefined) => void;
  setBranches: (branches: Branch[]) => void;
  addBranch: (branch: Branch) => void;
  updateBranch: (branch: Branch) => void;
  deleteBranch: (id: string) => void;
  setConfigId: (configId: string | null) => void;
  setConfig: (config: Config | undefined) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        // subscribe: (listener: any) => {
        //     const unsubscribe = subscribe(
        //       (state: StoreState) => listener(state),
        //       (state: StoreState) => state.environments
        //     );
        //     return unsubscribe;
        //   },
        token: null,
        email: null,
        githubAccount: null,
        githubAccessToken: null,
        password: null,
        // environmentId: null,
        environment: undefined,
        environments: [],
        // projectId: null,
        configId: null,
        project: null,
        editProject: false,
        editAccount: false,
        projects: [],
        branchId: null,
        branch: null,
        branches: [],
        config: null,
        setToken: (token: string | null) => set(() => ({ token: token })),
        setGithubAccount: (account: string | null) =>
          set(() => ({ githubAccount: account })),
        setGithubAccessToken: (token: string | null) =>
          set(() => ({ githubAccessToken: token })),
        setEmail: (email: string) => set(() => ({ email: email })),
        setEditAccount: (editAccount: boolean) =>
          set(() => ({ editAccount: editAccount })),
        setPassword: (password: string) => set(() => ({ password: password })),
        // setProjectId: (projectId: string | null) => set((state) => ({ projectId : projectId, project: state.projects.find(p => p.id === projectId)})),
        setProject: (project: Project | undefined) =>
          set(() => ({ project: project })),
        setEditProject: (editProject: boolean) =>
          set(() => ({ editProject: editProject })),
        setProjects: (projects: Project[]) =>
          set(() => ({ projects: projects })),
        addProject: (project: Project) =>
          set((state) => ({ projects: [...state.projects, project] })),
        updateProject: (project: Project) =>
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === project.id ? project : p,
            ),
          })),
        deleteProject: (id: string) =>
          set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
          })),
        // setBranchId: (branchId: string | null) => set(() => ({ branchId: branchId })),
        setBranch: (branch: Branch | undefined) =>
          set(() => ({ branch: branch })),
        setBranches: (branches: Branch[]) =>
          set(() => ({ branches: branches })),
        addBranch: (branch: Branch) =>
          set((state) => ({ branches: [...state.branches, branch] })),
        updateBranch: (branch: Branch) =>
          set((state) => ({
            branches: state.branches.map((b) =>
              b.id === branch.id ? branch : b,
            ),
          })),
        deleteBranch: (id: string) =>
          set((state) => ({
            branches: state.branches.filter((branch) => branch.id !== id),
            branch: null,
          })),
        // setEnvironmentId: (environmentId: string | null) => set((state) => ({ environmentId: environmentId, environment: state.environments.find(e => {e.id == environmentId}) })),
        setEnvironment: (environment: Environment | undefined) => {
          set(() => ({ environment: environment }));
        },
        setEnvironments: (environments: Environment[]) =>
          set(() => ({ environments: environments })),
        updateEnvironment: (environment: Environment) =>
          set((state) => ({
            environments: state.environments.map((e) =>
              e.id === environment.id ? environment : e,
            ),
          })),
        addEnvironment: (environment: Environment) =>
          set((state) => ({
            environments: [...state.environments, environment],
          })),
        deleteEnvironment: (id: string) =>
          set((state) => ({
            environments: state.environments.filter(
              (environment) => environment.id !== id,
            ),
          })),
        setConfigId: (id: string | null) => set(() => ({ configId: id })),
        setConfig: (config: Config | undefined) =>
          set(() => ({ config: config })),
      }),
      {
        name: "store",
      },
    ),
  ),
);
