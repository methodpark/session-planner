import React from 'react';
import { connect } from 'react-redux';
import { FaToggleOff, FaToggleOn } from 'react-icons/lib/fa';

import './ToggleButton.less';

const ToggleButton = (props) => {
  return (<span className="toggle-button">
    {
      props.checked ?
      <FaToggleOn /> :
      <FaToggleOff />
    }
  </span>);
};

export default connect(({theme}) => {
  const isDark = theme.name === 'dark';
  const onColor = isDark ? '#3e50b4' : '#dd0000';

  return {onColor};
})(ToggleButton);