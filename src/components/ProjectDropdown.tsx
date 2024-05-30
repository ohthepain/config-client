"use strict"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../models/Project';
import { Branch } from '../models/Branch';
import { Environment } from '../models/Environment';
import { Config } from '../models/Config';

const configServiceUrl = import.meta.env.VITE_CONFIG_SERVICE_URL;

type ProjectDropdownProps = {
    project: Project;
    branch: Branch;
    environment: Environment;
    config: Config;
};

// { project, branch, environment, config }
const ProjectDropdown: React.FC<ProjectDropdownProps> = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<Branch>();
    const [environments, setEnvironments] = useState<Environment[]>([]);
    const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>();
    const [configs, setConfigs] = useState<Config[]>([]);
    const [selectedConfig, setSelectedConfig] = useState<Config>();

    useEffect(() => {
        // Fetch projects on component mount
        fetchProjects();
    }, []);

    useEffect(() => {
        // Fetch branches when selected project changes
        if (selectedProject) {
            fetchBranches();
        }
    }, [selectedProject]);

    useEffect(() => {
        // Fetch configs when selected branch changes
        if (selectedBranch) {
            fetchConfigs();
        }
    }, [selectedBranch]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${configServiceUrl}/api/projects/`);
            const projects = response.data.map((data: any) => new Project(data));
            setProjects(projects);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await axios.get(`${configServiceUrl}/api/branches/`);
            const branches = response.data.map((data: any) => new Branch(data));
            setBranches(branches);
        } catch (error) {
            console.error('Failed to fetch branches:', error);
        }
    };
    const fetchConfigs = async () => {
        try {
            const response = await axios.get(`${configServiceUrl}/api/configs`);
            const configs = response.data.map((data: any) => new Config(data));
            setConfigs(configs);
        } catch (error) {
            console.error('Failed to fetch configs:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <select
                value={selectedProject?.id}
                onChange={(e) => setSelectedProject(projects.find(project => project.id === e.target.value))}
            >
                <option value="">Select a project</option>
                {projects.map((project: { id: string, name: string }) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>

            <select
                value={selectedBranch?.id}
                onChange={(e) => setSelectedBranch(branches.find(project => project.id === e.target.value))}
            >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                        {branch.name}
                    </option>
                ))}
            </select>

            <ul>
                {configs.map((config) => (
                    <li key={config.id}>config_{config.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectDropdown;