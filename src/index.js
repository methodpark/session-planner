import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { initSessionData } from './lib/sessionData';
import saga from './lib/state/saga';
import { reducer } from './lib/state/state';

import { initializeStateFromLocalStorage } from './lib/state/initState';
import setupSW from './lib/setupSW';

import App from './App.jsx';

import './index.less';

let composeEnhancers = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saga);

ReactDOM.render((
  <Provider store={store}>
      <App />
  </Provider>
), document.getElementById('root'));

initSessionData(store);

(async function() {
  await setupSW();
  initializeStateFromLocalStorage(store);
})();
