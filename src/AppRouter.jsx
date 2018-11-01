import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Slots from './components/overview/Slots';
import Screen from './components/screen/Screen';

const AppRoute = () => (
  <Router>
    <React.Fragment>
      <Route exact path="/" component={() => <Slots />} />
      <Route path="/screen" component={() => <Screen />} />
    </React.Fragment>
  </Router>
);

export default AppRoute;
