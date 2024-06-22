import React from "react";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useStore } from "@/store";
import { Config } from "@/models/Config";
import ConfigStatusMonitor from "./ConfigStatusMonitor";
import UserPreferencesManager from "@/services/UserPreferencesManager";
import { deployConfig } from "@/services/RequestManager";

interface ConfigDisplayProps {
  config: Config;
}

const ConfigEntry: React.FC<ConfigDisplayProps> = ({ config }) => {
  const { environments, project } = useStore();

  if (!config) {
    return null;
  }

  const updatedAt: Date = new Date(config.updatedAt);

  return (
    <div
      className="m-4 flex rounded-xl font-sans shadow-xl hover:bg-sky-50"
      //   onClick={() => console.log(config)}
    >
      <form className="w-full flex-col">
        <div className="flex flex-row space-x-4 bg-slate-300 p-4">
          <Badge className="flex bg-red-300">{config.branch.gitBranch}</Badge>
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <h1 className="bold flex text-xl italic">{`${config.id}`}</h1>
          <div className="flex items-center justify-center">
            {config.environments.length != 0 && (
            <FontAwesomeIcon icon={faArrowRight} />
            )}
          </div>
          <div className="ml-auto flex space-x-2">
            {config.environments
              .sort((a, b) => {
                return UserPreferencesManager.environmentSort(
                  project?.id,
                  a,
                  b,
                );
              })
              .map((_environment) => (
                <Badge className="ml-auto flex bg-blue-300">
                  {_environment.name}
                </Badge>
              ))}
          </div>
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
        <div className="flex flex-row space-x-2 bg-slate-300 p-2">
          {environments
            .sort((a, b) => {
              return UserPreferencesManager.environmentSort(project?.id, a, b);
            })
            .map((_environment) => (
              <div
                key={_environment.id}
                className="m-2 flex h-10 place-content-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={async () => {
                  console.log(`Deploy to ${_environment.name} `);
                  await deployConfig(config.id, _environment.id);
                }}
              >
                {_environment.name}
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default ConfigEntry;
