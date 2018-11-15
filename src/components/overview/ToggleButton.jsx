import React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';

import './ToggleButton.less';

const ToggleButton = (props) => {
  const { onColor } = props;

  return <Switch
    onChange={() => { }}
    onColor={onColor}
    checked={props.checked}
    className='react-switch toggle-button'
    id='notification-switch'
  />;
};

export default connect(({theme}) => {
  const isDark = theme.name === 'dark';
  const onColor = isDark ? '#3e50b4' : '#dd0000';

  return {onColor};
})(ToggleButton);