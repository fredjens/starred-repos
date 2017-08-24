import GithubAPI from 'github';

const github = new GithubAPI();

/**
 * Stared repos
 */

export async function getStaredRepos() {
  const repos = await github.activity.getStarredReposForUser({
    username: process.env.GITHUB_USERNAME,
    per_page: 100,
  });

  return repos;
};

/**
 * Get readme
 */

export async function getRepoReadme({ repo, owner }) {
  const repos = await github.repos.getContent({
    owner,
    repo,
    path: 'README.md',
  });

  return repos;
};