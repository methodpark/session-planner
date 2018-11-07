import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { discardPrompt } from '../../lib/state/state';

import './AddToHomeScreenPrompt.less';
import share from './share.svg';

function isIOsDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator) && (window.navigator.standalone);
}

class AddToHomeScreenPrompt extends React.Component {
  discard() {
    const { dispatch } = this.props;
    dispatch(discardPrompt(moment()));
  }

  display() {
    const {discarded} = this.props;
    return !discarded && isIOsDevice() && !isInStandaloneMode();
  }

  render() {
    return <div
      id="ios-install-prompt"
      className={this.display() ? 'active' : 'inactive'}
      onClick={() => this.discard()}
      >
        <div className="toast">
          <p>Install this application on your home screen for quick and easy access.</p>
          <p>
            Just tap
            <img src={share} className="ios-install-prompt-icon" alt="the share button" />
            then "Add to Home Screen".
          </p>
        </div>
    </div>;
  }
}

function mapStateToProps({prompt}) {
  return prompt;
}

export default connect(mapStateToProps)(AddToHomeScreenPrompt);