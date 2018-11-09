import React from 'react';

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
    <p class="legal">
      <a href="https://www.methodpark.com/overview/imprint.html" target="_blank" rel="noopener noreferrer">Legal Notice</a> |
      <a href="https://www.methodpark.com/overview/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
    </p>
  </footer>
);

export default Footer;