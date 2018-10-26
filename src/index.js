import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import { reducer, addSession } from './lib/state/state';
import saga from './lib/state/saga';
import { interceptRequest } from './lib/requestInterceptor';
import setupSW from './lib/setupSW';

import App from './App.jsx';

import './index.less';

let composeEnhancers = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(saga)


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

interceptRequest('/api/sessions', response => {
  if (response.status !== 200) {
    throw new Error('could not load sessions');
  }
  response.json()
    .then(result => _handleData(result))
    .catch(error => console.error(error.message));
});

function _handleData(sessions) {
  sessions.forEach(session => {
    store.dispatch(addSession(session.id, session.title, session.host, session.room, session.start, session.end));
  });
}

setupSW();
