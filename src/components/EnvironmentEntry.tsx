import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Environment } from "../models/Environment";
import EnvironmentForm from "./EnvironmentForm";

interface EnvironmentDisplayProps {
  environment: Environment;
}

const EnvironmentEntry: React.FC<EnvironmentDisplayProps> = ({
  environment,
}) => {
  const [editing, setEditing] = React.useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    setEditing(false);
  };

  if (!environment) {
    return null;
  }

  return (
    <div>
      <div className="stack-horizontal">
        <button onClick={handleEdit}>
          <FontAwesomeIcon icon={editing ? faChevronDown : faChevronRight} />
        </button>
        <h3>Environment: {environment.name ? environment.name : "None"}</h3>
      </div>
      {editing ? (
        <EnvironmentForm
          key={environment.id}
          environment={environment}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ) : (
        <div
          className="environment-card"
          onClick={() => console.log(environment)}
        >
          <div>Config: {environment.configId}</div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentEntry;
{
  /* <div data-view-component="true" class="js-notice new-feed-onboarding-notice d-flex 
flex-column width-full flex-items-baseline border rounded-2 color-border-default color-shadow-medium p-3 mt-2 mb-2"> */
}
