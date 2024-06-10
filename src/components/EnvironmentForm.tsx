"use strict";
import React, { useState } from "react";
import { Environment } from "../models/Environment";
import { saveEnvironment, deleteEnvironment } from "../services/RequestManager";
import { useStore } from "../store";

interface EnvironmentFormProps {
  environment?: Environment;
  onSave?: (environment: Environment) => void | undefined;
  onDelete?: (environment: Environment) => void | undefined;
}

const EnvironmentForm: React.FC<EnvironmentFormProps> = ({
  environment,
  onSave,
  onDelete,
}) => {
  const { project } = useStore();
  const [id] = useState(environment?.id);
  const [name, setName] = useState(environment?.name || "");
  const [timeTravelHours, setTimeTravelHours] = useState<number>(
    environment?.globalTimeTravel || 0
  );
  const [timeTravelMinutes, setTimeTravelMinutes] = useState<number>(
    environment?.globalTimeTravel || 0
  );
  const [notificationUrl, setNotificationUrl] = useState(
    environment?.notificationUrl || ""
  );
  const [uploadLocation, setUploadLocation] = useState(
    environment?.uploadLocation || ""
  );
  const [downloadUrl, setDownloadUrl] = useState(
    environment?.downloadUrl || ""
  );
  const [clientDownloadBucket, setClientDownloadBucket] = useState(
    environment?.clientDownloadBucket || ""
  );
  const [clientDownloadKey, setClientDownloadKey] = useState(
    environment?.clientDownloadKey || ""
  );
  const [awsRegion, setAwsRegion] = useState(environment?.awsRegion || "");
  const [warningMessage, setWarningMessage] = useState(
    environment?.warningMessage || ""
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (environment) {
      setConfirmDelete(true);
    }
  };

  const confirmDeleteAction = async () => {
    if (environment?.id) {
      try {
        await deleteEnvironment(environment);
        if (onDelete) {
          onDelete(environment);
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
      const environment: Environment = new Environment({
        id: id,
        name: name,
        projectId: project?.id,
        globalTimeTravel: timeTravelHours * 60 + timeTravelMinutes,
        notificationUrl: notificationUrl,
        uploadLocation: uploadLocation,
        clientDownloadBucket: clientDownloadBucket,
        clientDownloadKey: clientDownloadKey,
        downloadUrl: downloadUrl,
        awsRegion: awsRegion,
        warningMessage: warningMessage,
      });

      await saveEnvironment(environment);

      clearInputs();

      if (onSave) {
        onSave(environment);
      }
    } catch (error) {
      console.error("Error saving environment:", error);
    }
  };

  const clearInputs = () => {
    setName("");
    setTimeTravelHours(0);
    setTimeTravelMinutes(0);
    setNotificationUrl("");
    setUploadLocation("");
    setClientDownloadBucket("");
    setClientDownloadKey("");
    setDownloadUrl("");
  };

  return (
    <div className="m-4 flex flex-col h-96 p-4 w-full font-sans shadow-xl rounded-xl bg-slate-50 hover:bg-sky-50">
      <div className="stack-horizontal full-width">
        <h2>{environment ? "Edit Environment" : "New Environment"}</h2>
        {/* <button onClick={handleCancel}>Cancel</button> */}

        {confirmDelete && (
          <div>
            <p>Are you sure you want to delete this environment?</p>
            <button onClick={confirmDeleteAction}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="name" className="form-field-title">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* <div className="form-field">
        <label htmlFor="Time Travel Hours">Time Travel (hours):</label>
        <input
          id="timeTravelHours"
          type="number"
          value={timeTravelHours}
          onChange={(e) => {
            setTimeTravelHours(e.target.value);
          }}
        />
        <label htmlFor="Time Travel Minutes">(minutes):</label>
        <input
          id="timeTravelMinutes"
          type="number"
          value={timeTravelMinutes}
          onChange={(e) => {
            setTimeTravelMinutes(e.target.value);
          }}
        />
      </div> */}
      <div className="form-field">
        <label htmlFor="notificationUrl">Upload Location:</label>
        <input
          id="notificationUrl"
          type="text"
          value={notificationUrl}
          onChange={(e) => {
            setNotificationUrl(e.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="awsRegion">AWS Region:</label>
        <input
          id="awsRegion"
          type="text"
          value={awsRegion}
          onChange={(e) => {
            setAwsRegion(e.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="clientDownloadBucket">Client Download Bucket:</label>
        <input
          id="clientDownloadBucket"
          type="text"
          value={clientDownloadBucket}
          onChange={(e) => {
            setClientDownloadBucket(e.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="clientDownloadKey">Client Download Key:</label>
        <input
          id="clientDownloadKey"
          type="text"
          value={clientDownloadKey}
          onChange={(e) => {
            setClientDownloadKey(e.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="downloadUrl">Download URL:</label>
        <input
          id="downloadUrl"
          type="text"
          value={downloadUrl}
          onChange={(e) => {
            setDownloadUrl(e.target.value);
          }}
        />
      </div>
      <label htmlFor="warningMessage">Modification Warning Message:</label>
      <div className="form-field">
        <input
          id="warningMessage"
          type="text"
          value={warningMessage}
          onChange={(e) => {
            setWarningMessage(e.target.value);
          }}
        />
      </div>
      {environment?.id && <div>id: {environment?.id}</div>}
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

export default EnvironmentForm;
