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
  const [gitBranch, setGitBranch] = useState(
    branch?.gitBranch || "new-git-branch",
  );
  const [gitBranches, setGitBranches] = useState<GitBranch[]>([]);

  //   console.log(`BranchForm: render ${branch?.gitBranch || "new branch"}`);

  useEffect(() => {
    console.log(
      `useEffect: getBranchesForRepo: project ${project ? project.name : "null"}`,
    );
    if (project) {
      getBranchesForRepo(githubAccount!, githubAccessToken!, project!.gitRepo)
        .then((_gitBranches: GitBranch[]) => {
          console.log(
            `useEffect: GOT BranchesForRepo ${JSON.stringify(_gitBranches)}`,
          );
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
      console.log(`handleSave ${branch?.gitBranch} DONE`);

      //   clearInputs();

      //   if (props.onSave) {
      //     props.onSave(branch!);
      //   }
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  return (
    <div className="m-4 flex w-full shrink flex-col space-y-2 rounded-xl bg-slate-50 p-4 font-sans shadow-xl hover:bg-sky-50">
      <h2 className="flex w-full justify-center bg-pink-300">Git Repo</h2>
      <div className="flex">
        <h1>{`${branch?.project?.gitRepo || ""}`}</h1>
      </div>
      <div className="full-width flex bg-pink-300">
        {confirmDelete && (
          <div>
            <p>Are you sure you want to delete this branch?</p>
            <div className="flex flex-row">
              <button
                onClick={confirmDeleteAction}
                className="m-4 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="m-4 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex h-full bg-pink-300">
        <div className="flex w-full flex-col">
          <h2 className="flex w-full justify-center">Git Branch</h2>
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
      <div className="flex flex-auto flex-row">
        <button
          className="m-4 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="m-4 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="flex w-full justify-center bg-gray-100 text-sm italic text-opacity-30">
        {branch && branch.id ? `${branch?.id}` : `not saved`}
      </div>
    </div>
  );
};

export default BranchForm;
