import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Legal from './Legal';

const Footer = () => (
  <footer>
    <p>Made with <span role="img" aria-label="love">❤️</span> by
      {' '}
      <a href="https://www.methodpark.de/mobileapps-webapps.html" target="_blank" rel="noopener noreferrer">
        <img src="/logo/mp.png" class="footer-logo-mp" alt="method park" />
        {' '}
        team mobile
        {' '}
      </a>
      for <a href="https://swe-camp.de/" target="_blank" rel="noopener noreferrer">SWEC</a>
    </p>
    <Router>
      <Route exact path="/" component={() => <Legal />} />
    </Router>
  </footer>
);

export default Footer;