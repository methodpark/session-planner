import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Slots from './components/overview/Slots';

export default class AppRouter extends React.Component {
  render() {
    //add routes for additional screens

    return (
      <Router>
        <div>
          <Route exact path="/" component={() => <Slots />} />
        </div>
      </Router>
    );   
  }
}