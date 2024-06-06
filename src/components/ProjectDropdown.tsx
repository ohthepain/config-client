"use strict"
import { useEffect, useState } from 'react';
import { Project } from '../models/Project';
import { Branch } from '../models/Branch';
import { Config } from '../models/Config';
import { fetchProjects, fetchBranches, fetchConfigs } from '../services/RequestManager';
import { useStore } from '../store';

const ProjectDropdown: React.FC = () => {
    const { project, setProject, branch, setBranch } = useStore();
    const [projects, setProjects] = useState<Project[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [configs, setConfigs] = useState<Config[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchProjects();
            console.log('projects results ' + result);
            setProjects(result);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(projects);
    }, [projects]); 

    useEffect(() => {
        if (project) {
            const fetchData = async () => {
                const result = await fetchBranches(project.id)
                console.log('branch results ' + result);
                setBranches(result);
            };
            fetchData();
        }
    }, [project]);

    useEffect(() => {
        if (branch) {
            const fetchData = async () => {
                const result = await fetchConfigs(branch.id)
                console.log('config results ' + result);
                setConfigs(result);
            };
            fetchData();
        }
    }, [branch]);

    return (
        <div style={{ width: '100%' }}>
            <select
                value={project?.id}
                onChange={(e) => setProject(projects.find(project => project.id === e.target.value))}
            >
                <option value="">Select a project</option>
                {projects.map((project: { id: string, name: string }) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>
            <select
                value={branch?.id}
                onChange={(e) => setBranch(branches.find(project => project.id === e.target.value))}
            >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                        {branch.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProjectDropdown;