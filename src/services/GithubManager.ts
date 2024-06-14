import { Octokit } from '@octokit/rest';
import { useStore } from '../store';
import { GitRepo } from '../models/GitRepo';

export async function getRepositoriesForAccount(githubAccount: string, githubAccessToken: string): Promise<GitRepo[]> {
    const octokit = new Octokit({
    auth: githubAccessToken,
  });

  try {
    const response = await octokit.rest.repos.listForUser({
      username: githubAccount!,
    //   type: "private",
    });

    var repos = []
    for (let repo of response.data) {
        // console.log(`${JSON.stringify(repo)}\n`);
        repos.push(new GitRepo(repo));
    }

    return repos;
  } catch (error) {
    console.error("Error fetching private repositories:", error);
    throw error;
  }
}

export async function test() {
    // Usage example
    const githubAccount = useStore.getState().githubAccount;
    const githubAccessToken = useStore.getState().githubAccessToken;

    getRepositoriesForAccount(githubAccount!, githubAccessToken!)
    .then((repositories: GitRepo[]) => {
        for (let repo of repositories) {
            console.log(`${JSON.stringify(repo)}\n`);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
