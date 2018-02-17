import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getStaredRepos(user) {
  const url = `${baseUrl}/starred/${user}`;

  return axios.get(url)
  .then(res => res.data.data)
  .catch(err => console.log(err));
}


export function getRepoReadme({ owner, repo }) {
  const url = `${baseUrl}/readme`;

  return axios.post(url, {
    owner,
    repo,
  })
  .then(res => res.data.data)
  .catch(err => console.log(err));
}