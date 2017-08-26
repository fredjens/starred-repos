import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getStaredRepos, getRepoReadme } from './services';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = {
  port: process.env.PORT || 5000,
};

/**
 * Stared repos
 */

app.get('/starred/:user', async (req, res) => {
  console.log('query', req.params);
  const { user } = req.params;

  const repos = await getStaredRepos(user);
  res.send(repos);
});

/**
 * Readme
 */

app.post('/readme', async (req, res) => {
  const {
    repo = '',
    owner = '',
  } = req.body;

  const readme = await getRepoReadme({ repo, owner });
  res.send(readme);
});

app.get('/', (req, res) => {
  res.send('🏤 backend');
});

/**
 * Init
 */

app.listen(server.port, () => {
  console.log(`🏤 backend listening to port ${server.port}`);
});
