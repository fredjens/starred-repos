import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import store from './store';
import createRoutes from './routes';
import registerServiceWorker from './service-workers/registerServiceWorker';

/**
 * Create history (synced with store)
 */
const history = syncHistoryWithStore(browserHistory, store);

/**
 * Create routes (with synced history)
 */
const routes = createRoutes({ history });

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();