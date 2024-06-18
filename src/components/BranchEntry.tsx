import React from 'react';
import { Branch } from '../models/Branch';

interface BranchDisplayProps {
  branch: Branch;
}

const BranchEntry: React.FC<BranchDisplayProps> = ({ branch }) => {
    if (!branch) {
        return null;
    }
  return (
    <div className="flex branch-card" onClick={() => console.log(branch)}>
      <h3>Branch {branch.id} Branch: {branch.gitBranch ? branch.gitBranch : 'None'}</h3>
      <div>GIT: {branch.gitBranch}</div>
    </div>
  );
};

export default BranchEntry;
{/* <div data-view-component="true" class="js-notice new-feed-onboarding-notice d-flex 
flex-column width-full flex-items-baseline border rounded-2 color-border-default color-shadow-medium p-3 mt-2 mb-2"> */}
