"use strict";

import axios from 'axios';
import { Project } from '../models/Project';
import { Branch } from '../models/Branch';
import { Environment } from '../models/Environment';
import { Config } from '../models/Config';

const configServiceUrl = import.meta.env.VITE_CONFIG_SERVICE_URL

// const headers = {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${adminToken}`
// };

export const authenticate = async (email: string, password: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${configServiceUrl}/api/auth`, { "email": email, "password": password }, { headers: { "Content-Type": "application/json"} });
        return response.data.accessToken;
    } catch (error) {
        console.error('Failed to authenticate:', error);
        return null;
    }
};

export const fetchProjects = async (): Promise<Project[]> => {
    const response = await axios.get(`${configServiceUrl}/api/projects/`);
    return response.data;
};

export const fetchBranches = async (projectId: string): Promise<Branch[]> => {
    const response = await axios.get(`${configServiceUrl}/api/projects/${projectId}/branches`);
    return response.data;
};

export const fetchEnvironments = async (projectId: string): Promise<Environment[]> => {
    const response = await axios.get(`${configServiceUrl}/api/environments/${projectId}`);
    return response.data;
};

export const fetchConfigs = async (projectId: string, branchId: string): Promise<Config[]> => {
    const response = await axios.get(`${configServiceUrl}/api/projects/${projectId}/branches/${branchId}/configs`);
    return response.data;
};
  
// Add more functions as needed...
// export default { fetchProjects, fetchBranches, fetchConfigs };
