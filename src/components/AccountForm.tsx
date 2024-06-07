// Form for editing Account
"use strict";
import React from 'react';
import { useStore } from '../store';

const AccountForm: React.FC = () => {
    const { githubAccount, setGithubAccount } = useStore();
    const { githubAccessToken, setGithubAccessToken } = useStore();
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setGithubAccount(githubAccount);
            setGithubAccessToken(githubAccessToken);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-red'>
            Github account:
            <input
                type="text"
                placeholder="githubAccount"
                value={githubAccount || '(account)'}
                onChange={(e) => setGithubAccount(e.target.value)}
            />
            Github access token:
            <input
                type="password"
                placeholder="githubAccessToken"
                value={githubAccessToken || '(token)'}
                onChange={(e) => setGithubAccessToken(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleDelete}>
                Delete
            </button>
            {confirmDelete && (
                <div>
                    Are you sure you want to delete this project?
                    <button type="button" onClick={() => setConfirmDelete(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={confirmDeleteAction}>
                        Confirm
                    </button>
                </div>
            )}
        </form>
    );
}

export default AccountForm;
