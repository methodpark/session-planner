import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { initSessionData } from './lib/sessionData';
import saga from './lib/state/saga';
import { reducer } from './lib/state/state';
import { loadFavorites } from './lib/localStorage';

import setupSW from './lib/setupSW';

import App from './App.jsx';

import './index.less';
import { initPrompt } from './lib/state/reducers/prompt';
import { initFavorites } from './lib/state/reducers/favorites';

let composeEnhancers = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saga);

const favorites = loadFavorites();
store.dispatch(initFavorites(favorites));

store.dispatch(initPrompt());

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

initSessionData(store);

setupSW();
