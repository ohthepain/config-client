import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Branch } from "../models/Branch";
import { Config } from "../models/Config";
import {
  fetchProjects,
  fetchBranches,
  fetchConfigs,
  fetchEnvironments,
} from "../services/RequestManager";
import { useStore } from "../store";
import ProjectForm from "./ProjectForm";
import AccountForm from "./AccountForm";

const ProjectDropdown: React.FC = () => {
  const { project, setProject, branch, setBranch } = useStore();
  const { projects, setProjects } = useStore();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [configs, setConfigs] = useState<Config[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      var result = await fetchProjects();
      console.log("projects results " + result + configs);
      setProjects(result);

      if (project) {
        await fetchBranches(project.id);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  useEffect(() => {
    if (project) {
      const fetchData = async () => {
        const result = await fetchBranches(project.id);
        console.log("branch results " + result);
        setBranches(result);
      };
      fetchData();
    }
  }, [project]);

  useEffect(() => {
    if (branch) {
      const fetchData = async () => {
        const result = await fetchConfigs(branch.id);
        console.log("config results " + result);
        setConfigs(result);
      };
      fetchData();
    }
  }, [branch]);

  return (
    <div className="flex">
      <div>
        <select
          value={project?.id}
          onChange={(e) => {
            setProject(
              projects.find((project) => project.id === e.target.value),
            );
            fetchEnvironments(e.target.value);
          }}
        >
          <option value="">Select a project</option>
          {projects.map((project: { id: string; name: string }) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <select
          value={branch?.id}
          onChange={(e) => {
            setBranch(
              branches.find((project) => project.id === e.target.value),
            );
          }}
        >
          <option value="">Select a branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.gitBranch}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          <FontAwesomeIcon icon={editing ? faChevronDown : faChevronRight} />
        </button>

        <div className="stack-horizontal">
          {project && editing && (
            <ProjectForm
              project={project}
              onSave={() => console.log("Project saved")}
              onDelete={() => console.log("Project deleted")}
            />
          )}
          {editing && <AccountForm />}
        </div>
      </div>
    </div>
  );
};

export default ProjectDropdown;
