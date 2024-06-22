import { useEffect, useState } from "react";
import Login from "./components/Login.tsx";
import ConfigList from "./components/ConfigList";
import { SideBar } from "./components/SideBar.tsx";
import { useStore } from "./store";
import EnvironmentForm from "./components/EnvironmentForm.tsx";
import ProjectForm from "./components/ProjectForm.tsx";
import BranchForm from "./components/BranchForm.tsx";
import AccountForm from "./components/AccountForm.tsx";
import { Branch } from "./models/Branch";

function App() {
  const { project, environment, editProject } = useStore();
  const { editAccount } = useStore();
  const { branch } = useStore();
  const [_branch, _setBranch] = useState<Branch | null>(null);

  useEffect(() => {
    // console.log(`App: branch changed to ${branch?.gitBranch}`);
    _setBranch(branch);
  }, [branch]);

  useEffect(() => {
    // console.log(`App: environment changed to ${environment?.name}`);
  }, [environment]);

  return (
    <div className="flex-col bg-orange-500">
      <div className="h-24 flex-row bg-slate-50 shadow-lg">
        <div className="flex h-24 flex-auto rotate-0 flex-row bg-slate-50 shadow-lg">
          <Login></Login>
          <div className="flex w-full flex-col items-center justify-center bg-slate-50">
            {/* <div className=" text-center italic font-sans font-bold text-[3rem]">
              {project?.name || "Select Project"}
            </div> */}
            <div>
              <p className="font-display inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-7xl italic tracking-tight text-transparent">
                {project?.name || "Select Project"}
              </p>
            </div>
          </div>
          <div className="w-96 flex-col bg-slate-50" />
        </div>
      </div>
      <div>{editAccount && <AccountForm></AccountForm>}</div>
      <div>
        {editProject && project && (
          <ProjectForm
            project={project}
            onSave={() => {}}
            onDelete={() => {}}
          ></ProjectForm>
        )}
      </div>
      <div>
        <div className="flex flex-row bg-slate-50 shadow-lg">
          <SideBar></SideBar>
          <ConfigList branch={_branch}></ConfigList>
          <div className="flex basis-1/3 flex-col">
            {branch && <BranchForm />}
            {environment && (
              <EnvironmentForm
                environment={environment}
                onSave={() => {}}
              ></EnvironmentForm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
