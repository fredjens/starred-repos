/**
 * Dependencies
 */
const express = require('express');
const history = require('connect-history-api-fallback');
const forceSsl = require('force-ssl-heroku');

/**
 * Environment / configuration
 */
const port = process.env.PORT || 3000;

/**
 * Create our express app
 */
const app = express();

/**
 * Force SSL in production
 */
if (process.env.NODE_ENV === 'production') {
  app.use(forceSsl);
}

/**
 * Use history fallback
 */
app.use(history());

/**
 * Serve static files from the appropriate folder
 */
app.use(express.static(`${__dirname}/../../build`));

/**
 * Attach server to port
 */
app.listen(port, () => {
  console.log(`😄 frontend-app listening to port ${port}`);
});