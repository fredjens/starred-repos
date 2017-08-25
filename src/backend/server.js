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

app.get('/backend/starred', async (req, res) => {
  const repos = await getStaredRepos();
  res.send(repos);
});

/**
 * Readme
 */

app.post('/backend/readme', async (req, res) => {
  const {
    repo = '',
    owner = '',
  } = req.body;

  const readme = await getRepoReadme({ repo, owner });
  res.send(readme);
});

app.get('/backend', (req, res) => {
  res.send('🏤 backend');
});

/**
 * Init
 */

app.listen(server.port, () => {
  console.log(`🏤 backend-api listening to port ${server.port}`);
});
