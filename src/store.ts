import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Project } from './models/Project';
import { Branch } from './models/Branch';
import { Environment } from './models/Environment';
import { Config } from './models/Config';

interface StoreState {
    // subscribe: (listener: any) => any;
    email: string | null;
    password: string | null;
    projectId: string | null;
    branchId: string | null;
    environmentId: string | null;
    configId: string | null;
    project: Project | null;
    branch: Branch | null;
    environment: Environment | undefined;
    config: Config | null;
    environments: Environment[];
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setProjectId: (projectId: string | null) => void;
    setBranchId: (branchId: string | null) => void;
    setEnvironmentId: (environmentId: string | null) => void;
    setConfigId: (configId: string | null) => void;
    setProject: (project: Project | undefined) => void;
    setBranch: (branch: Branch | undefined) => void;
    setEnvironment: (environment: Environment | undefined) => void;
    setConfig: (config: Config | undefined) => void;
    setEnvironments: (environments: Environment[]) => void;
    updateEnvironment: (environment: Environment) => void;
    addEnvironment: (environment: Environment) => void;
    deleteEnvironment: (environmentId: string) => void;
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
            email: null,
            password: null,
            projectId: null,
            branchId: null,
            environmentId: null,
            configId: null,
            project: null,
            branch: null,
            environment: undefined,
            config: null,
            environments: [],
            setEmail: (email: string) => set(() => ({ email: email })),
            setPassword: (password: string) => set(() => ({ password: password })),
            setProject: (project: Project | undefined) => set(() => ({ project: project })),
            setBranch: (branch: Branch | undefined) => set(() => ({ branch: branch })),
            setEnvironment: (environment: Environment | undefined) => set(() => ({ environment: environment })),
            setConfig: (config: Config | undefined) => set(() => ({ config: config })),
            setProjectId: (projectId: string | null) => set(() => ({ projectId : projectId })),
            setBranchId: (branchId: string | null) => set(() => ({ branchId: branchId })),
            setEnvironmentId: (environmentId: string | null) => set(() => ({ environmentId: environmentId })),
            setConfigId: (id: string | null) => set(() => ({ configId: id })),
            setEnvironments: (environments: Environment[]) => set(() => ({ environments: environments })),
            updateEnvironment: (environment: Environment) => set((state) => ({ environments: state.environments.map(e => e.id === environment.id ? environment : e) })),
            addEnvironment: (environment: Environment) => set((state) => ({ environments: [...state.environments, environment] })),
            deleteEnvironment: (id: string) => set((state) => ({ environments: state.environments.filter(environment => environment.id !== id) })), 
        }),
        {
          name: 'store',
        },
      ),
    ),
)
