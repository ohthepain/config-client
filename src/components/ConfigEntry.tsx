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
    <div className="config-card" onClick={() => console.log(config)}>
      <h3>
        Config {config.id} Branch: {config.branch ? config.branch.name : "None"}
      </h3>
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
  );
};

export default ConfigEntry;
