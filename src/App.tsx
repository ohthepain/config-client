import "./index.css";
import "./App.css";
import "./AppMenu.css";
import ProjectDropdown from "./components/ProjectDropdown";
import Login from "./components/Login.tsx";
import ConfigList from "./components/ConfigList";
import ConfigDetails from "./components/ConfigDetails.tsx";
import EnvironmentList from "./components/EnvironmentList.tsx";

function App() {
  return (
    <div className="ui-wrapper">
      <div className="stack-vertical full-height full-width">
        <div className="App-menu stack-horizontal">
          <ProjectDropdown></ProjectDropdown>
          <Login></Login>
        </div>
        <div className="stack stack-horizontal full-width">
          <div>
            <EnvironmentList></EnvironmentList>
          </div>
          <div>
            <ConfigList></ConfigList>
          </div>
          <div>
            <ConfigDetails config={null}></ConfigDetails>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
