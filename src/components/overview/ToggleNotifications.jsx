import React from 'react';
import { connect } from 'react-redux';
import { FaVolumeOff, FaVolumeUp } from 'react-icons/lib/fa';

import { toggleNotifications } from '../../lib/state/reducers/notifications';

class ToggleNotifications extends React.Component {
  toggleNotifications() {
    const { dispatch } = this.props;
    dispatch(toggleNotifications());
  }

  renderIcon() {
    if (this.props.active) {
      return (<span><FaVolumeUp /> Notifications on</span >);
    } else {
      return (<span><FaVolumeOff /> Notifications off</span>);
    }

  }

  render() {
    return (
      <button className="theme-switch" onClick={() => this.toggleNotifications()}>{this.renderIcon()}</button>
    );
  }
}

export default connect(({ notifications }) => {
  return notifications;
})(ToggleNotifications);