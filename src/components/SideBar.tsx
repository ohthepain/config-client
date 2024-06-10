import { useState, useEffect } from "react";
// import produce from "immer";
import { useStore } from "../store";
import { Project } from "models/Project";
import { Environment } from "models/Environment";
import { fetchEnvironments, fetchProjects } from "../services/RequestManager";
import Login from "./Login";

export const SideBar = () => {
  const { projectId, setProjectId } = useStore();
  const { projects, setProjects } = useStore();
  const { environments, setEnvironments } = useStore();
  const [_environments, _setEnvironments] = useState<Environment[]>([]);
  const [_projects, _setProjects] = useState<Project[]>([]);
  const [_projectId, _setProjectId] = useState<string>("");
  const { environmentId, setEnvironmentId } = useStore();
  const [_environmentId, _setEnvironmentId] = useState<string>("");

  const _fetchEnvironments = async () => {
    console.log(`_fetchEnvironments: project ${_projectId}`)
    try {
      if (_projectId) {
        await fetchEnvironments(_projectId).then((environments) => {
          console.log(`_fetchEnvironments: received ${JSON.stringify(environments)}`)
          setEnvironments(environments);
          _setEnvironments(environments);
        });
      }
    } catch (error) {
      console.error("Error fetching environments:", error);
    }
  };

  // Fetch projects on initial render.
  // If projectId is set, fetch environments for that project.
  // Detect changes to projectId and fetch environments for the new project.
  // Detect changes to environments and update the local state.

  useEffect(() => {
    console.log(`useEffect: _projectId ${_projectId}`);
    setProjectId(_projectId);
    _fetchEnvironments();

    // const unsubscribe = useStore.subscribe((state) => {
    //   if (state.environments !== environments) {
    //     _setEnvironments(environments);
    //   }
    // });

    // return unsubscribe;
  }, [_projectId]);

  useEffect(() => {
    console.log(`useEffect: _environmentId ${_environmentId}`);
    setEnvironmentId(_environmentId);
  }, [_environmentId]);

  useEffect(() => {
    console.log(`useEffect: []`);
    fetchProjects().then((projs) => {
      setProjects(projs);
      _setProjects(projs);
    });
    _setProjectId(projectId || "");
  }, []);

  return (
    <div className="basis-1/4 flex-col top-0 left-0 h-screen min-w-48 flex-column bg-slate-100 p-4">
      <div className="py-2"/>
      <h2 className="font-display font-medium text-slate-900 dark:text-white">
        Projects
      </h2>
      <ul
        role="list"
        className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
      >
        {projects.map((project) => (
          <div
            id={project.id}
            key={project.id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              const target = e.currentTarget as HTMLDivElement;
              console.log(JSON.stringify(target.id));
              _setProjectId(target.id);
            }}
          >
            <li className="relative" key={project.id}>
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
                href="/"
              >
                {project.name}
              </a>
            </li>
            <li className="relative" key={`_{project.id}`}>
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                href="/docs/installation"
              >
                Installation - {project.name}
              </a>
            </li>
          </div>
        ))}
      </ul>

      <div className="py-2"/>

      <h2 className="font-display font-medium text-slate-900 dark:text-white">
        Environments
      </h2>
      <ul
        role="list"
        className="mt-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
      >
        {_environments.map((environment) => (
          <div
            id={environment.id}
            key={environment.id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              const target = e.currentTarget as HTMLDivElement;
              console.log(`environment ${JSON.stringify(target.id)}`);
              if (target.id != environmentId) {
                _setEnvironmentId(target.id);
              }
            }}
          >
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
                href="/"
              >
                {environment.name}
              </a>
            </li>
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                href="/docs/installation"
              >
                Config - {environment.configId ? `{environment.configId}` : `none`}
              </a>
            </li>
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                href="/docs/installation"
              >
                Bucket - {environment.clientDownloadBucket ? `${environment.clientDownloadBucket}` : `none`}
            </a>
            </li>

          </div>
        ))}
      </ul>
    </div>
  );
};
