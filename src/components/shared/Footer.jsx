import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Legal from './Legal';

const OptionalLegal = () => (
  <Router>
    <Switch>
      <Route path="/screen" render={() => ''} />
      <Route component={Legal} />
    </Switch>
  </Router>
);

const Footer = () => (
  <footer>
    <p>Made with <span role="img" aria-label="love">❤️</span> by
      {' '}
      <a href="https://www.methodpark.de/mobileapps-webapps.html" target="_blank" rel="noopener noreferrer">
        <img src="/logo/mp.png" className="footer-logo-mp" alt="method park" />
        {' '}
        team mobile
        {' '}
      </a>
      for <a href="https://swe-camp.de/" target="_blank" rel="noopener noreferrer">SWEC</a>
    </p>
    <OptionalLegal />
  </footer>
);

export default Footer;