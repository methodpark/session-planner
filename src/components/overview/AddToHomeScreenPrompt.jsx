import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { isInStandaloneMode, isIOsDevice, isNonSafariOnIos } from '../../lib/iosDetection';

import './AddToHomeScreenPrompt.less';
import share from './share.svg';
import { discardPrompt } from '../../lib/state/reducers/prompt';

class AddToHomeScreenPrompt extends React.Component {
  discard() {
    const { dispatch } = this.props;
    dispatch(discardPrompt(moment()));
  }

  display() {
    const {discarded} = this.props;
    return !discarded && isIOsDevice() && !isInStandaloneMode() && !isNonSafariOnIos();
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