import React, { useEffect, useState } from "react";
import { Environment } from "../models/Environment";
import { saveEnvironment, deleteEnvironment } from "../services/RequestManager";
import { useStore } from "../store";

interface EnvironmentFormProps {
  environment: Environment;
  onSave?: (environment: Environment) => void | undefined;
  onDelete?: (environment: Environment) => void | undefined;
}

const EnvironmentForm: React.FC<EnvironmentFormProps> = (props) => {
  //   console.log(`EnvironmentForm: render ${props.environment.name}`);
  const [environment, setEnvironment] = useState<Environment>(
    props.environment,
  );
  const { project } = useStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    // console.log(`useEffect: setEnvironment ${props.environment.name}`);
    setEnvironment(props.environment);
  }, [props.environment]);

  const handleDelete = async () => {
    if (environment) {
      setConfirmDelete(true);
    }
  };

  const confirmDeleteAction = async () => {
    if (environment?.id) {
      try {
        await deleteEnvironment(environment);
        if (props.onDelete) {
          props.onDelete(environment);
        }
      } catch (error) {
        console.error("Error deleting environment:", error);
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
      await saveEnvironment(environment!);

      if (props.onSave) {
        props.onSave(environment!);
      }
    } catch (error) {
      console.error("Error saving environment:", error);
    }
  };

  return (
    <div className="m-4 flex w-full shrink flex-col rounded-xl bg-slate-50 p-4 font-sans shadow-xl hover:bg-sky-50">
      <div className="full-width flex">
        <h2 className="flex w-full justify-center bg-green-200">
          {environment ? "Environment" : "New Environment"}
        </h2>
        {/* <button onClick={handleCancel}>Cancel</button> */}

        {confirmDelete && (
          <div>
            <p>Are you sure you want to delete this environment?</p>
            <button onClick={confirmDeleteAction}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        )}
      </div>
      <div className="flex">
        <label htmlFor="name" className="flex-title">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={environment.name || ""}
          onChange={(e) =>
            setEnvironment({ ...environment, name: e.target.value })
          }
        />
      </div>
      <div className="flex">
        <label htmlFor="notificationUrl">Upload Location:</label>
        <input
          id="notificationUrl"
          type="text"
          value={environment.notificationUrl}
          onChange={(e) => {
            setEnvironment({ ...environment, notificationUrl: e.target.value });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="awsRegion">AWS Region:</label>
        <input
          id="awsRegion"
          type="text"
          value={environment.awsRegion}
          onChange={(e) => {
            setEnvironment({ ...environment, awsRegion: e.target.value });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="clientDownloadBucket">Client Download Bucket:</label>
        <input
          id="clientDownloadBucket"
          type="text"
          value={environment.clientDownloadBucket}
          onChange={(e) => {
            setEnvironment({
              ...environment,
              clientDownloadBucket: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="clientDownloadKey">Client Download Key:</label>
        <input
          id="clientDownloadKey"
          type="text"
          value={environment.clientDownloadKey}
          onChange={(e) => {
            setEnvironment({
              ...environment,
              clientDownloadKey: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="downloadUrl">Download URL:</label>
        <input
          id="downloadUrl"
          type="text"
          value={environment.downloadUrl}
          onChange={(e) => {
            setEnvironment({ ...environment, downloadUrl: e.target.value });
          }}
        />
      </div>
      <label htmlFor="warningMessage">Modification Warning Message:</label>
      <div className="flex">
        <input
          id="warningMessage"
          type="text"
          value={environment.warningMessage}
          onChange={(e) => {
            setEnvironment({ ...environment, warningMessage: e.target.value });
          }}
        />
      </div>
      {environment?.id && <div>id: {environment?.id}</div>}
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
    </div>
  );
};

export default EnvironmentForm;
