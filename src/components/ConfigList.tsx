import React, { useState, useEffect } from "react";
import { Config } from "../models/Config";
import { fetchConfigs } from "../services/RequestManager";
import ConfigEntry from "./ConfigEntry";
import { Branch } from "../models/Branch";

interface ConfigListProps {
  branch: Branch | null;
}

const ConfigList: React.FC<ConfigListProps> = (props) => {
  const branch = props.branch;
  const [configs, setConfigs] = useState<Config[]>([]);

  const fetchData = async () => {
    try {
      var fetchedConfigs: Config[] = [];
      if (branch && branch.id) {
        // console.log(`fetching configs for branch ${JSON.stringify(branch)}`);
        fetchedConfigs = await fetchConfigs(branch.id);
      }
      setConfigs(fetchedConfigs);
    } catch (error) {
      console.error("Error fetching configs:", error);
    }
  };

  useEffect(() => {
    // console.log(`ConfigList: useEffect: branch.gitBranch ${branch ? branch.gitBranch : "null"}`);
    fetchData();
  }, [branch]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex basis-1/2 flex-col">
      {configs.length === 0 && (
        <div className="width-full m-8 flex justify-center text-xl italic text-gray-500">
          {branch
            ? `No configs found for branch ${branch.gitBranch}`
            : `Please select a branch`}
        </div>
      )}
      {configs
        .sort((a, b) => (a.id > b.id ? -1 : 1))
        .map((config) => (
          <ConfigEntry key={config.id} config={config} />
        ))}
    </div>
  );
};

export default ConfigList;
