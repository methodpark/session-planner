import React from 'react';
import './AddToHomeScreenPrompt.less';

function isIOsDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator) && (window.navigator.standalone);
}

export class AddToHomeScreenPrompt extends React.Component {
  constructor() {
    super();
    this.state = {discarded: false};
  }

  discard() {
    this.setState(() => ({
      discarded: true
    }));
  }

  display() {
    const {discarded} = this.state;
    return !discarded && isIOsDevice() && !isInStandaloneMode();
  }

  render() {
    return <div
      id="ios-install-prompt"
      className={this.display() ? 'active' : 'inactive'}
      onClick={() => this.discard()}
      >
        <p>Install this application on your home screen for quick and easy access.</p>
        <p>Just tap
        <svg
          className="ios-install-prompt-icon"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <title>Share</title>
          <path fill="#007AFF" d="M48.883,22.992L61.146,10.677L61.146,78.282C61.146,80.005 62.285,81.149 64,81.149C65.715,81.149 66.854,80.005 66.854,78.282L66.854,10.677L79.117,22.992C79.693,23.57 80.256,23.853 81.114,23.853C81.971,23.853 82.534,23.57 83.11,22.992C84.25,21.848 84.25,20.125 83.11,18.981L65.997,1.794C65.715,1.511 65.421,1.215 65.139,1.215C64.563,0.932 63.718,0.932 62.861,1.215C62.579,1.498 62.285,1.498 62.003,1.794L44.89,18.981C43.75,20.125 43.75,21.848 44.89,22.992C46.029,24.149 47.744,24.149 48.883,22.992ZM103.936,35.32L81.114,35.32L81.114,41.053L103.936,41.053L103.936,121.27L24.064,121.27L24.064,41.053L46.886,41.053L46.886,35.32L24.064,35.32C20.928,35.32 18.355,37.904 18.355,41.053L18.355,121.27C18.355,124.419 20.928,127.003 24.064,127.003L103.936,127.003C107.072,127.003 109.645,124.419 109.645,121.27L109.645,41.053C109.645,37.891 107.072,35.32 103.936,35.32Z" />
        </svg>
        then "Add to Home Screen".
      </p>
    </div>;
  }
}
