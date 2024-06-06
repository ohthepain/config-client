import React, { useState, useEffect } from 'react';
import { Config } from '../models/Config';
import { fetchConfigs } from '../services/RequestManager';
import ConfigEntry from './ConfigEntry';
import { useStore } from '../store';

const ConfigList: React.FC = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const { branch } = useStore();

  useEffect(() => {
        const fetchData = async () => {
            try {
                var fetchedConfigs: Config[] = [];
                if (branch) {
                    fetchedConfigs = await fetchConfigs(branch.id);
                }
                setConfigs(fetchedConfigs);
            } catch (error) {
                console.error('Error fetching configs:', error);
            }
        }
        fetchData();
    }, []);

  return (
    <div>
      <h1>Config List</h1>
      {configs.map((config) => (
        <ConfigEntry key={config.id} config={config} />
      ))}
    </div>
  );
};

export default ConfigList;

