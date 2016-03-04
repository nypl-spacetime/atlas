import React from 'react';
import { render } from 'react-dom';

import App from './app';

import './index.scss';

var api = __CONFIG__.api;

render(
  <App api={api} />,
  document.getElementById('app')
);
