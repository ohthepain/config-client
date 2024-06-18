import React, { useEffect, useState } from "react";
import { Branch } from "../models/Branch";
import { saveBranch, deleteBranch } from "../services/RequestManager";
import { useStore } from "../store";
import { GitBranch } from "../models/GitBranch";
import { getBranchesForRepo } from "../services/GithubManager";

// interface BranchFormProps {
//   branch: Branch;
//   onSave?: (branch: Branch) => void | undefined;
//   onDelete?: (branch: Branch) => void | undefined;
// }

const BranchForm: React.FC = () => {
//   const [branch, setBranch] = useState<Branch>(props.branch);
  const { branch } = useStore();
  const { project, githubAccount, githubAccessToken } = useStore();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [gitBranch, setGitBranch] = useState(branch?.gitBranch || "new-git-branch");
  const [gitBranches, setGitBranches] = useState<GitBranch[]>([]);

//   console.log(`BranchForm: render ${branch?.gitBranch || "new branch"}`);

  useEffect(() => {
    console.log(`useEffect: getBranchesForRepo: project ${project ? project.name : "null"}`)
    if (project) {
        getBranchesForRepo(githubAccount!, githubAccessToken!, project!.gitRepo)
            .then((_gitBranches: GitBranch[]) => {
                console.log(`useEffect: GOT BranchesForRepo ${JSON.stringify(_gitBranches)}`)
                setGitBranches(_gitBranches);
            })
            .catch((error) => {
            console.error("Error:", error);
            });
    }
  }, [project]);

  const handleDelete = async () => {
    if (branch) {
      setConfirmDelete(true);
    }
  };

  const confirmDeleteAction = async () => {
    if (branch?.id) {
      try {
        await deleteBranch(branch);
        // if (props.onDelete) {
        //   props.onDelete(branch);
        // }
      } catch (error) {
        console.error("Error deleting branch:", error);
      }
    }
    setConfirmDelete(false);
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleSave = async () => {
    console.log(`handleSave : branch ${JSON.stringify(branch)}`);
    try {
      await saveBranch(branch!);
      console.log(`handleSave ${branch?.gitBranch} DONE`)

    //   clearInputs();

    //   if (props.onSave) {
    //     props.onSave(branch!);
    //   }
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  return (
    <div className="m-4 flex flex-col space-y-2 shrink p-4 w-full font-sans shadow-xl rounded-xl bg-slate-50 hover:bg-sky-50">
        <h2 className="flex justify-center w-full bg-pink-300">Git Repo</h2>
        <div className="flex">
            <h1>
            {`${branch?.project?.gitRepo || ""}`}
            </h1>
        </div>
      <div className="flex full-width bg-pink-300">
        {confirmDelete && (
            <div>
                <p>Are you sure you want to delete this branch?</p>
                <div className="flex flex-row">
                    <button onClick={confirmDeleteAction} className="flex place-content-center m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
                        Yes
                    </button>
                    <button onClick={cancelDelete} className="flex place-content-center m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
                        No
                    </button>
                </div>
          </div>
        )}
      </div>
      <div className="flex h-full bg-pink-300">
        <div className="flex flex-col w-full">
        <h2 className="flex justify-center w-full">Git Branch</h2>
        <select
            className="flex justify-center"
            value={gitBranch.name}
            onChange={(e) => {
                console.log(`setGitBranch ${e.target.value}`);
                setGitBranch(e.target.value);
                if (branch) {
                    branch.gitBranch = e.target.value;
                } else {
                    console.error("branch is null");
                }
            }}
        >
            {gitBranches.map((gitBranch: GitBranch) => (
                <option key={gitBranch.name} value={gitBranch.name}>
                    {gitBranch.name}
                </option>
            ))}
        </select>
        </div>
      </div>
      <div className="flex flex-row flex-auto">
        <button
          className="flex place-content-center m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="flex place-content-center m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="flex w-full bg-gray-100 text-sm text-opacity-30 italic justify-center">
          {(branch && branch.id) ? `${branch?.id}` : `not saved`}
      </div>
    </div>
  );
};

export default BranchForm;
