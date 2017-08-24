const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getStaredRepos() {
  const url = `${baseUrl}/starred`;

  return fetch(url)
  .then(res => res.json())
  .then(json => json.data);
}


export function getRepoReadme({ owner, repo }) {
  const url = `${baseUrl}/readme`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ owner, repo })
  })
  .then(res => res.json())
  .then(json => json.data.content);
}