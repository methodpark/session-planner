import React from 'react';
import { connect } from 'react-redux';
import { FaVolumeOff, FaVolumeUp } from 'react-icons/lib/fa';

import { toggleNotifications } from '../../lib/state/reducers/notifications';
import { setupPushNotifications } from '../../lib/setupSW';

import ToggleButton from './ToggleButton';

class ToggleNotifications extends React.Component {
  constructor() {
    super();

    this.state = { permissionRequested: false };
  }

  initializePushNotifications() {
    this.setState({
      permissionRequested: true
    });
    setupPushNotifications();
}

  toggleNotifications() {
    const { dispatch } = this.props;
    dispatch(toggleNotifications());

    if (!this.state.permissionRequested) {
      this.initializePushNotifications();
    }
  }

  renderButtonContent() {
    const { active } = this.props;

    return (<span>
      {active ? <FaVolumeUp /> : <FaVolumeOff />} Notifications
      <ToggleButton checked={active} />
    </span>);
  }

  render() {
    return (
      <button className="theme-switch" onClick={() => this.toggleNotifications()}>{this.renderButtonContent()}</button>
    );
  }
}

export default connect(({ notifications, theme }) => {
  return notifications;
})(ToggleNotifications);