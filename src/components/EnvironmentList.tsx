import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import { Environment } from "../models/Environment";
import { fetchEnvironments } from "../services/RequestManager";
import { useStore } from "../store";
import EnvironmentEntry from "./EnvironmentEntry";
import EnvironmentForm from "./EnvironmentForm";

const EnvironmentList: React.FC = () => {
  const { environments, project } = useStore();
  const [envs, setEnvs] = useState<Environment[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (project) {
          await fetchEnvironments(project.id);
          setEnvs(environments);
        }
      } catch (error) {
        console.error("Error fetching environments:", error);
      }
    };
    fetchData();
    const unsubscribe = useStore.subscribe((state) => {
      setEnvs(state.environments);
    });
    return unsubscribe;
  }, []);

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <div className="flex flex-col w-64">
      <div className="flex flex-col">
        <h1>Environments</h1>
        <button onClick={handleEdit}>
          <FontAwesomeIcon icon={editing ? faClose : faPlus} />
        </button>
      </div>
        {editing && (
            <EnvironmentForm environment={undefined} onSave={() => {setEditing(false)}}></EnvironmentForm>
        )}
      {envs.sort((a, b) => a.updatedAt < b.updatedAt ? -1 : 1).map((environment: Environment) => (
        <EnvironmentEntry key={environment.id} environment={environment} />
      ))}
    </div>
  );
};

export default EnvironmentList;
