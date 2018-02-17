import GithubAPI from 'github';
import { safePromise } from 'unexceptional';

const github = new GithubAPI({
  debug: true,
});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN,
});

/**
 * Stared repos
 */

export async function getStaredRepos(username) {
  console.log('username', username);
  const [err, repos] = await safePromise(github.activity.getStarredReposForUser({
    username: username,
    per_page: 100,
  }));

  if (err) {
    console.log('ERR', err);
  }

  return repos;
};

/**
 * Get readme
 */

export async function getRepoReadme({ repo, owner }) {
  const [err, repos] = await safePromise(github.repos.getContent({
    owner,
    repo,
    path: 'README.md',
  }));

  if (err) {
    console.log('ERR', err);
  }

  return repos;
};