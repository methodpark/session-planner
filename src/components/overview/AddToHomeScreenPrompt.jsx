import React from 'react';
import './AddToHomeScreenPrompt.less';
import share from './share.svg';

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
        <p>
          Just tap
          <img src={share} className="ios-install-prompt-icon" alt="the share button" />
          then "Add to Home Screen".
      </p>
    </div>;
  }
}
