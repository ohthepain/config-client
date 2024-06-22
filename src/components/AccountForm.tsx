// Form for editing Account
import React from "react";
import { useStore } from "../store";
import UserPreferencesManager from "../services/UserPreferencesManager";

const AccountForm: React.FC = () => {
  const {
    githubAccount,
    setGithubAccount,
    githubAccessToken,
    setGithubAccessToken,
    setEditAccount,
  } = useStore();
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleDelete = async () => {
    setConfirmDelete(true);
  };

  const confirmDeleteAction = async () => {
    try {
      setGithubAccount(null);
      setGithubAccessToken(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setGithubAccount(githubAccount);
      setGithubAccessToken(githubAccessToken);
      setEditAccount(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const deleteUserPreferences = async () => {
    UserPreferencesManager.deleteProjectPreferences();
  }    

  return (
    <form onSubmit={handleSubmit} className="bg-red rotate-0 shadow-xl">
      <div className="m-2 flex flex-col place-content-center">
        <div className="m-2 flex flex-row">
          Github account:
          <input
            type="text"
            placeholder="githubAccount"
            value={githubAccount || "(account)"}
            onChange={(e) => setGithubAccount(e.target.value)}
          />
        </div>
        <div className="m-2 flex flex-row">
          Github access token:
          <input
            type="password"
            placeholder="githubAccessToken"
            value={githubAccessToken || "(token)"}
            onChange={(e) => setGithubAccessToken(e.target.value)}
          />
        </div>
      </div>
      <div className="flex place-content-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="m-2 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="m-2 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Delete
        </button>
        <button
            type="button"
            onClick={deleteUserPreferences}
            className="m-2 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Delete Prefs
        </button>        
      </div>
      {confirmDelete && (
        <div>
          Are you sure you want to delete this project?
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDeleteAction}
            className="flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      )}
    </form>
  );
};

export default AccountForm;
