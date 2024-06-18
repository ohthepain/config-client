import React, { useEffect } from "react";
import { Project } from "../models/Project";
import { saveProject, deleteProject } from "../services/RequestManager";
import { useStore } from "../store";
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
  const { githubAccount, githubAccessToken, setEditProject } = useStore();

  //   useEffect(() => {
  //     setName(project.name);
  //     setGitRepo(project.gitRepo);
  //   }, [project]);

  const handleDelete = async () => {
    setConfirmDelete(true);
  };

  const confirmDeleteAction = async () => {
    try {
      await deleteProject(project);
      onDelete();
      useStore.getState().setEditProject(false);
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

  useEffect(() => {
    getRepositoriesForAccount(githubAccount!, githubAccessToken!)
      .then((repositories: GitRepo[]) => {
        setGitRepos(repositories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row bg-fuchsia-200">
        <div className="flex w-full justify-center">Edit Project</div>
        <div className="flex w-64 justify-center bg-white">
          <button
            className="close-button"
            onClick={() => {
              setEditProject(false);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div className="flex h-full flex-row justify-center bg-slate-500">
        <form onSubmit={handleSubmit}>
          <div className="m-2 flex h-full justify-center bg-slate-200">
            <div className="flex flex-col">
              <div className="flex w-full justify-center">
                <h2>Project name:</h2>
              </div>
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex h-full bg-pink-300">
              <div className="flex flex-col">
                <h2 className="flex justify-center">Git Repo</h2>
                <select
                  value={gitRepo}
                  onChange={(e) => {
                    setGitRepo(e.target.value);
                  }}
                >
                  {gitRepos.map((repo: GitRepo) => (
                    <option key={repo.name} value={repo.name}>
                      {repo.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex w-64 flex-col items-center">
              <button
                type="submit"
                className="m-2 flex h-10 w-32 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="m-2 flex h-10 w-32 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Delete
              </button>
              {confirmDelete && (
                <div className="flex flex-col items-center bg-red-500 p-2">
                  <strong>Are you sure you want to delete this project?</strong>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="m-2 flex h-10 w-32 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDeleteAction}
                    className="m-2 flex h-10 w-32 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
