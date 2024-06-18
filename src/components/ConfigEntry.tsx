import React from "react";
import { Config } from "../models/Config";
import ConfigStatusMonitor from "./ConfigStatusMonitor";

interface ConfigDisplayProps {
  config: Config;
}

const ConfigEntry: React.FC<ConfigDisplayProps> = ({ config }) => {
  if (!config) {
    return null;
  }

  const updatedAt: Date = new Date(config.updatedAt);

  return (
    <div className="m-4 flex font-sans shadow-xl rounded-xl hover:bg-sky-50" onClick={() => console.log(config)}>
      <form className="flex-auto">
        <div className="bg-slate-300 p-4">
        <h3>
            {`Config ${config.id} (${config.branch ? config.branch.gitBranch : "none"})`}
        </h3>
        </div>
        <div className="p-6">
        <div className="flex flex-row">
        <div>Status: {config.status}</div>
        <ConfigStatusMonitor status={config.status} />
        </div>
        <div>Branch: {config.branch ? config.branch.gitBranch : "None"}</div>
        <div>Notes: {config.notes}</div>
        <div>Hash: {config.gitHash}</div>
        <p>
          Updated:{" "}
          {updatedAt.toLocaleDateString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        </div>
      </form>
    </div>
  );
};

export default ConfigEntry;
