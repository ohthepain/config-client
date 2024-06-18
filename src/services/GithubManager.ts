import { Octokit } from '@octokit/rest';
import { GitRepo } from '../models/GitRepo';
import { GitBranch } from '../models/GitBranch';

export async function getRepositoriesForAccount(githubAccount: string, githubAccessToken: string): Promise<GitRepo[]> {
    
  const octokit = new Octokit({ auth: githubAccessToken });

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

export async function getBranchesForRepo(githubAccount: string, githubAccessToken: string, gitRepo: string): Promise<GitBranch[]> {

  const octokit = new Octokit({ auth: githubAccessToken });

  console.log(`getBranchesForRepo ${githubAccount} / ${gitRepo}`);

  try {
    let _branches: any[] = [];
    let page = 1;
    let perPage = 100;
    const owner = githubAccount;

    while (true) {
      const response = await octokit.rest.repos.listBranches({
        perPage: perPage,
        page: page,
        owner: owner,
        repo: gitRepo
      });

      _branches = _branches.concat(response.data);

      if (response.data.length < perPage) {
        break;
      }

      page++;
    }

    let branches: GitBranch[] = [];
    for (let branch of _branches) {
      branches.push(new GitBranch(branch));
    }

    return branches;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
}
