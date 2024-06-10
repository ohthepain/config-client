import React from "react";
import { Config } from "../models/Config";

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
        <div className="bg-slate-200 p-4">
        <h3>
          Config {config.id} Branch:{" "}
          {config.branch ? config.branch.name : "None"}
        </h3>
        </div>
        <div className="p-6">
        <div>Status: {config.status}</div>
        <div>Branch: {config.branch ? config.branch.name : "None"}</div>
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
