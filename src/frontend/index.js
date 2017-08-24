import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './service-workers/registerServiceWorker';
import Routes from './routes';

import './App.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);

registerServiceWorker();
