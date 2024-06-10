import Login from "./components/Login.tsx";
import ConfigList from "./components/ConfigList";
import { SideBar } from "./components/SideBar.tsx";
import { useStore } from "./store";
import EnvironmentForm from "./components/EnvironmentForm.tsx";

function App() {
  const { project, environment } = useStore();
  return (
    <div className="flex-col bg-orange-500">
      <div className="flex-row bg-slate-50 h-24 shadow-lg">
        <div className="flex flex-row flex-auto bg-slate-50 h-24 shadow-lg rotate-0">
          {/* <ProjectDropdown></ProjectDropdown> */}
          <Login></Login>
          <div className="flex-col w-full bg-slate-50 flex items-center justify-center">
            <div className=" text-center italic font-sans font-bold text-[3rem]">
              {project?.name || "Select Project"}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row bg-slate-50 shadow-lg">
          <SideBar></SideBar>
          <ConfigList></ConfigList>
          <div className="flex basis-1/3 flex-row shadow-lg bg-purple-300 h-screen">
            {environment && (
            <EnvironmentForm environment={undefined} onSave={() => {}}></EnvironmentForm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
