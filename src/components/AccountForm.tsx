// Form for editing Account
"use strict";
import React from 'react';
import { useStore } from '../store';

const AccountForm: React.FC = () => {
    const { githubAccount, setGithubAccount, githubAccessToken, setGithubAccessToken, setEditAccount } = useStore();
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const handleDelete = async () => {
        setConfirmDelete(true);
    };

    const confirmDeleteAction = async () => {
        try {
            setGithubAccount(null);
            setGithubAccessToken(null);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            setGithubAccount(githubAccount);
            setGithubAccessToken(githubAccessToken);
            setEditAccount(false);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-red shadow-xl rotate-0'>
            <div className='flex flex-col place-content-center m-2'>
            <div className='flex flex-row m-2'>
            Github account:
            <input
                type="text"
                placeholder="githubAccount"
                value={githubAccount || '(account)'}
                onChange={(e) => setGithubAccount(e.target.value)}
            />
            </div>
            <div className='flex flex-row m-2'>
            Github access token:
            <input
                type="password"
                placeholder="githubAccessToken"
                value={githubAccessToken || '(token)'}
                onChange={(e) => setGithubAccessToken(e.target.value)}
            />
            </div>
            </div>
            <div className='flex place-content-center'>
            <button type="submit" onClick={handleSubmit} className='flex place-content-center m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10'>
                Save
            </button>
            <button type="button" onClick={handleDelete} className='flex place-content-center m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10'>
                Delete
            </button>
            </div>
            {confirmDelete && (
                <div>
                    Are you sure you want to delete this project?
                    <button type="button" onClick={() => setConfirmDelete(false)} className='flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10'>
                        Cancel
                    </button>
                    <button type="button" onClick={confirmDeleteAction} className='flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10'>
                        Confirm
                    </button>
                </div>
            )}
        </form>
    );
}

export default AccountForm;
