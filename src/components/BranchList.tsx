import React, { useState, useEffect } from 'react';
import { Branch } from '../models/Branch';
import { fetchBranches } from '../services/RequestManager';
import BranchEntry from './BranchEntry';
import { useStore } from '../store';

const BranchList: React.FC = () => {
  const [branchs, setBranchs] = useState<Branch[]>([]);
  const { branch } = useStore();

  useEffect(() => {
        const fetchData = async () => {
            try {
                var fetchedBranchs: Branch[] = [];
                if (branch) {
                    fetchedBranchs = await fetchBranches(branch.id);
                }
                setBranchs(fetchedBranchs);
            } catch (error) {
                console.error('Error fetching branchs:', error);
            }
        }
        fetchData();
    }, []);

  return (
    <div>
      <h1>Branch List</h1>
      {branchs.map((branch) => (
        <BranchEntry key={branch.id} branch={branch} />
      ))}
    </div>
  );
};

export default BranchList;

