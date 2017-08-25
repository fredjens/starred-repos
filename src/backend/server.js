import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const history = require('connect-history-api-fallback');
const forceSsl = require('force-ssl-heroku');

import { getStaredRepos, getRepoReadme } from './services';

const app = express();

app.use(cors());
app.use(bodyParser.json());

/**
 * Force SSL in production
 */
if (process.env.NODE_ENV === 'production') {
  app.use(forceSsl);
}

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
 * Frotnend
 */

app.use(express.static(`${__dirname}/../../build`));

/**
 * Init
 */

app.listen(server.port, () => {
  console.log(`🏤 backend-api listening to port ${server.port}`);
});
