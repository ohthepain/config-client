"use strict";

import axios from 'axios';
import { Project } from '../models/Project';
import { Branch } from '../models/Branch';
import { Environment } from '../models/Environment';
import { Config } from '../models/Config';
import { useStore } from '../store';

const configServiceUrl = import.meta.env.VITE_CONFIG_SERVICE_URL

const getHeaders = () => {
    const adminToken: string | null = useStore.getState().token;
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${adminToken}`
    }
};

export const authenticate = async (email: string, password: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${configServiceUrl}/api/auth`, 
            { "email": email, "password": password }, 
            { headers: { "Content-Type": "application/json"} }
        );
        return response.data.accessToken;
    } catch (error) {
        console.error('Failed to authenticate:', error);
        return null;
    }
};

export const fetchProjects = async (): Promise<Project[]> => {
    const response = await axios.get(`${configServiceUrl}/api/projects/`,
        { headers: getHeaders() }
    );
    return response.data;
};

export const saveProject = async (project: Project) => {
    const id = project.id;
    const p: Project = await axios.put(`${configServiceUrl}/api/projects`, project,
        { headers: getHeaders() }
    );
    // Optimistic update
    if (id) {
        useStore.getState().updateProject(p);
    } else {
        useStore.getState().addProject(p);
    }
}

export const deleteProject = async (project: Project) => {
    const id = project.id;
    console.log(`deleting project ${project.name}`);
    await axios.delete(`${configServiceUrl}/api/projects?id=${project.id}`,
        { headers: getHeaders() }
    );
    // Optimistic update
    useStore.getState().deleteProject(id);
}

export const saveBranch = async (branch: Branch) => {
    const id = branch.id;
    const p: Project = await axios.put(`${configServiceUrl}/api/branches`, branch,
        { headers: getHeaders() }
    );
    // Optimistic update
    if (id) {
        useStore.getState().updateBranch(p);
    } else {
        useStore.getState().addBranch(p);
    }
}

export const deleteBranch = async (branch: Branch) => {
    const id = branch.id;
    console.log(`deleting branch ${branch.name}`);
    await axios.delete(`${configServiceUrl}/api/branches?id=${branch.id}`,
        { headers: getHeaders() }
    );
    // Optimistic update
    useStore.getState().deleteBranch(id);
}

export const fetchBranches = async (projectId: string): Promise<Branch[]> => {
    const response = await axios.get(`${configServiceUrl}/api/branches?projectId=${projectId}`,
        { headers: getHeaders() }
    );
    useStore.getState().setBranches(response.data);
    return response.data;
};

export const fetchEnvironments = async (projectId: string): Promise<Environment[]> => {
    // console.log(`fetchEnvironments: project ${projectId}`);
    const response = await axios.get(`${configServiceUrl}/api/environments?projectId=${projectId}`,
        { headers: getHeaders() }
    );
    // console.log(`fetchEnvironments: received ${JSON.stringify(response.data)}`);
    useStore.getState().setEnvironments(response.data);
    return response.data;
};

export const saveEnvironment = async (environment: Environment) => {
    const id = environment.id;
    await axios.put(`${configServiceUrl}/api/environments`, environment,
        { headers: getHeaders() }
    );
    // Optimistic update
    if (id) {
        useStore.getState().updateEnvironment(environment);
    } else {
        useStore.getState().addEnvironment(environment);
    }
};

export const deleteEnvironment = async (environment: Environment) => {
    const id = environment.id;
    console.log(`deleting environment ${environment.name}`);
    await axios.delete(`${configServiceUrl}/api/environments?id=${environment.id}`,
        { headers: getHeaders() }
    );
    // Optimistic update
    useStore.getState().deleteEnvironment(id);
};

export const fetchConfigs = async (branchId: string): Promise<Config[]> => {
    const response = await axios.get(`${configServiceUrl}/api/configs?branchId=${branchId}`,
        { headers: getHeaders() }
    );
    return response.data;
};
  
// Add more functions as needed...
// export default { fetchProjects, fetchBranches, fetchConfigs };
