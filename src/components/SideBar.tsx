import { useEffect } from "react";
import { useStore } from "../store";
import { Environment } from "../models/Environment";
import { Branch } from "../models/Branch";
import { fetchEnvironments, fetchProjects, fetchBranches } from "../services/RequestManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../models/Project";

const onClickNewProject = () => {
    console.log(`onClickNewProject`);
    useStore.getState().setProject(new Project({
    name: "New Project",
    }));
    useStore.getState().setEditProject(true);
}

const onClickNewBranch = () => {
    const project: Project | null = useStore.getState().project;
    console.log(`onClickNewBranch: projectId ${project?.id}`);
    const newBranch = new Branch({
        projectId: project!.id,
        project: project!
    });
    // useStore.getState().setEditBranch(true);
    // Optimistic update
    useStore.getState().addBranch(newBranch)
    useStore.getState().setBranch(newBranch);
}

const onClickNewEnvironment = () => {
    console.log(`onClickNewEnvironment`);
    useStore.getState().setEnvironment(new Environment({
        name: "New Environment",
    }));
    // useStore.getState().setEditProject(true);
}
  
export const SideBar = () => {
  const { project, setProject, setEditProject } = useStore();
  const { projects, setProjects } = useStore();
  const { branches, branch, setBranch } = useStore();
  const { environment, setEnvironment } = useStore();
  const { environments, setEnvironments } = useStore();

  const _fetchEnvironments = async () => {
    // console.log(`_fetchEnvironments: project ${_projectId}`)
    try {
      if (project && project.id) {
        await fetchEnvironments(project.id).then((environments) => {
        //   console.log(`_fetchEnvironments: received ${JSON.stringify(environments)}`)
          setEnvironments(environments);
        //   _setEnvironments(environments);
        });
      }
    } catch (error) {
      console.error("Error fetching environments:", error);
    }
  };

  useEffect(() => {
    setEnvironment(undefined);
    setBranch(undefined);
    _fetchEnvironments();
    fetchBranches(project?.id);
  }, [project]);

  useEffect(() => {
    console.log(`useEffect: []`);
    fetchProjects().then((projs) => {
      setProjects(projs);
    });
  }, []);

  return (
    <div className="basis-1/4 flex-col top-0 left-0 h-screen min-w-48 flex-column bg-slate-100 p-4">
      <div className="py-2"/>
      <div className="flex flex-row justify-between">
      <h2 className="font-display font-medium text-slate-900 dark:text-white">
        Projects
      </h2>
        <button className="bg-gray-200 hover:bg-gray-300 rounded-md shadow-md h-6 w-6 inline-block transition-colors duration-300"
          onClick={() => {
            // setEditing(!editing);
          }}
        >
          <FontAwesomeIcon icon={faPlus} onClick={onClickNewProject}/>
        </button>
      </div>
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
              const project = projects.find(p => p.id === target.id)
              setProject(project);
              console.log(`fetchBranches ${project!.id}`)
              fetchBranches(project!.id)
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
            <li className="relative" key={`_{project.id}`} onClick={() => { setEditProject(true) }}>
                Edit
            </li>
          </div>
        ))}
      </ul>

      <div className="py-2"/>
      <div className="flex flex-row justify-between">
      <h2 className="font-display font-medium text-slate-900 dark:text-white">
        Branches
      </h2>
      <button className="bg-gray-200 hover:bg-gray-300 rounded-md shadow-md h-6 w-6 inline-block transition-colors duration-300"
          onClick={() => {
            // setEditing(!editing);
          }}
        >
          <FontAwesomeIcon icon={faPlus} onClick={onClickNewBranch}/>
      </button>
      </div>
      <ul
        role="list"
        className="mt-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
      >
        {branches.map((_branch) => (
          <div
            id={_branch.id}
            key={_branch.id}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              const target = event.currentTarget as HTMLDivElement;
              console.log(`branchId ${JSON.stringify(target.id)} vs ${branch?.id}`);
              if (target.id != branch?.id) {
                const _branch: Branch | undefined = branches.find(e => e.id === target.id);
                console.log(`setBranch ${JSON.stringify(_branch)}`);
                setBranch(_branch);
              }
            }}
          >
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
              >
                {_branch.gitBranch}
              </a>
            </li>
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
              >
                gitBranch - {_branch.gitBranch ? `${_branch.gitBranch}` : `none`}
              </a>
            </li>
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
              >
                Edit
            </a>
            </li>

          </div>
        ))}
      </ul>

      <div className="py-2"/>
      <div className="flex flex-row justify-between">
      <h2 className="font-display font-medium text-slate-900 dark:text-white">
        Environments
      </h2>
      <button className="bg-gray-200 hover:bg-gray-300 rounded-md shadow-md h-6 w-6 inline-block transition-colors duration-300"
          onClick={() => {
            // setEditing(!editing);
          }}
        >
          <FontAwesomeIcon icon={faPlus} onClick={onClickNewEnvironment}/>
      </button>
      </div>
      <ul
        role="list"
        className="mt-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
      >
        {environments.map((_environment) => (
          <div
            id={_environment.id}
            key={_environment.id}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                // console.log(`environment.id ${environment?.id}`);
              const target = event.currentTarget as HTMLDivElement;
              console.log(`environmentId ${JSON.stringify(target.id)} vs ${environment?.id}`);
              if (target.id != environment?.id) {
                const env: Environment | undefined = environments.find(e => e.id === target.id);
                console.log(`setEnvironment ${JSON.stringify(env)}`);
                setEnvironment(env);
              }
            }}
          >
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
              >
                {_environment.name}
              </a>
            </li>
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
              >
                Config - {_environment.configId ? `${_environment.configId}` : `none`}
              </a>
            </li>
            <li className="relative">
              <a
                className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
              >
                Bucket - {_environment.clientDownloadBucket ? `${_environment.clientDownloadBucket}` : `none`}
            </a>
            </li>

          </div>
        ))}
      </ul>
    </div>
  );
};
