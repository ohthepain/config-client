import React, { useEffect, useState } from "react";
import { Branch } from "../models/Branch";
import { saveBranch, deleteBranch } from "../services/RequestManager";
import { useStore } from "../store";

interface BranchFormProps {
  branch: Branch;
  onSave?: (branch: Branch) => void | undefined;
  onDelete?: (branch: Branch) => void | undefined;
}

const BranchForm: React.FC<BranchFormProps> = (props) => {
  console.log(`BranchForm: render ${props.branch.name}`);
  const [branch, setBranch] = useState<Branch>(props.branch);
  const { project } = useStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    console.log(`useEffect: setBranch ${props.branch.name}`);
    setBranch(props.branch);
  }, [props.branch]);

  const handleDelete = async () => {
    if (branch) {
      setConfirmDelete(true);
    }
  };

  const confirmDeleteAction = async () => {
    if (branch?.id) {
      try {
        await deleteBranch(branch);
        if (props.onDelete) {
          props.onDelete(branch);
        }
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
    console.log(`handleSave ${project ? project.id : "null"}`);
    try {
      await saveBranch(branch!);

      clearInputs();

      if (props.onSave) {
        props.onSave(branch!);
      }
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  const clearInputs = () => {
    const newBranch: Branch = new Branch({
        id: undefined,
        name: "(New Branch)",
        projectId: project?.id,
        globalTimeTravel: 0,
        gitBranch: branch.gitBranch,
    });

    setBranch(newBranch);
  };

  return (
    <div className="m-4 flex flex-col shrink p-4 w-full font-sans shadow-xl rounded-xl bg-slate-50 hover:bg-sky-50">
      <div className="flex full-width">
        <h2>{branch ? "Edit Branch" : "New Branch"}</h2>
        {/* <button onClick={handleCancel}>Cancel</button> */}

        {confirmDelete && (
          <div>
            <p>Are you sure you want to delete this branch?</p>
            <button onClick={confirmDeleteAction}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        )}
      </div>
      <div className="flex">
        <label htmlFor="name" className="flex-title">Name:</label>
        <input
          id="name"
          type="text"
          value={branch.name || ""}
          onChange={(e) => setBranch({...branch, name: e.target.value})}
        />
      </div>
      <div className="flex">
        <label htmlFor="clientDownloadBucket">Client Download Bucket:</label>
        <input
          id="gitBranch"
          type="text"
          value={branch.gitBranch}
          onChange={(e) => {setBranch({...branch, gitBranch: e.target.value})}}
        />
      </div>
      {branch?.id && <div>id: {branch?.id}</div>}
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
    </div>
  );
};

export default BranchForm;
