"use strict"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const configServiceUrl = import.meta.env.VITE_CONFIG_SERVICE_URL;

const ProjectDropdown = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [configs, setConfigs] = useState([]);

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
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await axios.get(`${configServiceUrl}/api/branches/`);
            setBranches(response.data);
        } catch (error) {
            console.error('Failed to fetch branches:', error);
        }
    };
    const fetchConfigs = async () => {
        try {
            const response = await axios.get(`${configServiceUrl}/api/configs`);
            setConfigs(response.data);
        } catch (error) {
            console.error('Failed to fetch configs:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
            >
                <option value="">Select a project</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>

            <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
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
                    <li key={config.id}>{config.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectDropdown;