import React from 'react';
import { Config } from '../models/Config';

interface ConfigDisplayProps {
  config: Config;
}

const ConfigEntry: React.FC<ConfigDisplayProps> = ({ config }) => {
    if (!config) {
        return null;
    }
  return (
    <div className="config-card" onClick={() => console.log(config)}>
      <h3>Config {config.id} Branch: {config.branch ? config.branch.name : 'None'}</h3>
      <div>Status: {config.status}</div>
      <div>Branch: {config.branch ? config.branch.name : 'None'}</div>
      <div>Notes: {config.notes}</div>
      <div>Hash: {config.gitHash}</div>
      <div>Created at: {config.createdAt}</div>
    </div>
  );
};

export default ConfigEntry;
{/* <div data-view-component="true" class="js-notice new-feed-onboarding-notice d-flex 
flex-column width-full flex-items-baseline border rounded-2 color-border-default color-shadow-medium p-3 mt-2 mb-2"> */}
