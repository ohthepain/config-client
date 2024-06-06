"use strict";

import axios from 'axios';
import { Project } from '../models/Project';
import { Branch } from '../models/Branch';
import { Environment } from '../models/Environment';
import { Config } from '../models/Config';
import { useStore } from '../store';

const configServiceUrl = import.meta.env.VITE_CONFIG_SERVICE_URL

const getHeaders = () => {
    const adminToken: string | null = localStorage.getItem('token');
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

export const fetchBranches = async (projectId: string): Promise<Branch[]> => {
    const response = await axios.get(`${configServiceUrl}/api/branches?projectId=${projectId}`,
        { headers: getHeaders() }
    );
    return response.data;
};

export const fetchEnvironments = async (projectId: string) => {
    console.log(`fetchEnvironments: project ${projectId}`);
    const response = await axios.get(`${configServiceUrl}/api/environments?projectId=${projectId}`,
        { headers: getHeaders() }
    );
    useStore.getState().setEnvironments(response.data);
    // return response.data;
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
    const response = await axios.get(`${configServiceUrl}/api/configs?${branchId}`,
        { headers: getHeaders() }
    );
    return response.data;
};
  
// Add more functions as needed...
// export default { fetchProjects, fetchBranches, fetchConfigs };
