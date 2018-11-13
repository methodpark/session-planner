import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Menu } from './components/overview/Menu';

import Slots from './components/overview/Slots';
import Screen from './components/screen/Screen';

export const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Route exact path="/" component={() => <Slots />} />
      <Route path="/screen" component={() => <Screen />} />
    </React.Fragment>
  </Router>
);

export const MenuRouter = () => (
  <Router>
    <React.Fragment>
      <Route exact path="/" component={ ()=> <Menu /> } />
    </React.Fragment>
  </Router>
);
