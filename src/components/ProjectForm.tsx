// Form for editing Project
"use strict";
import React from "react";
import { Project } from "../models/Project";
import { saveProject, deleteProject } from "../services/RequestManager";
import { useStore } from '../store'
import { getRepositoriesForAccount } from "../services/GithubManager";
import { GitRepo } from "../models/GitRepo";

interface ProjectFormProps {
  project: Project;
  onSave: () => void;
  onDelete: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onDelete,
}) => {
  const [name, setName] = React.useState(project.name);
  const [gitRepo, setGitRepo] = React.useState(project.gitRepo);
  const [gitRepos, setGitRepos] = React.useState<GitRepo[]>([]);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const { githubAccount, githubAccessToken } = useStore();

  const handleDelete = async () => {
    setConfirmDelete(true);
  };

  const confirmDeleteAction = async () => {
    try {
      await deleteProject(project);
      onDelete();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveProject({ ...project, name, gitRepo });
      onSave();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  getRepositoriesForAccount(githubAccount!, githubAccessToken!).then((repositories: GitRepo[]) => {
    setGitRepos(repositories);
  }).catch((error) => {
    console.error("Error:", error);
  });

  return (
    <form onSubmit={handleSubmit}>
      Project name:
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Git repo:
      <input
        type="text"
        placeholder="gitRepo"
        value={gitRepo}
        onChange={(e) => setGitRepo(e.target.value)}
      />
      <select value={gitRepo} onChange={(e) => { setGitRepo(e.target.value);}} >
        <option value="">Select a branch</option>
        {gitRepos.map((repo: GitRepo) => (
          <option key={repo.name} value={repo.name}>
            {repo.name}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      {confirmDelete && (
        <div>
          Are you sure you want to delete this project?
          <button type="button" onClick={() => setConfirmDelete(false)}>
            Cancel
          </button>
          <button type="button" onClick={confirmDeleteAction}>
            Confirm
          </button>
        </div>
      )}
    </form>
  );
};

export default ProjectForm;
