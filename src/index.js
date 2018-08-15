import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

import './index.less';

ReactDOM.render(<App />, document.getElementById('root'));

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('serviceWorker.js').then(registration => {
    console.log(registration);
  });
}