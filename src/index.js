import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import { reducer, saga, addSession } from './lib/state';
import { interceptRequest } from './lib/requestInterceptor';
import setupSW from './lib/setupSW';

import App from './App.jsx';

import './index.less';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

interceptRequest('/sessions', response => {
  if (response.status !== 200) {
    throw new Error('could not load sessions');
  }
  response.json()
    .then(result => _handleData(result))
    .catch(error => console.error(error.message));
});

function _handleData(sessions) {
  sessions.forEach(session => {
    store.dispatch(addSession(session.id, session.title, session.speaker, session.room, session.start, session.end));
  });
}

setupSW();