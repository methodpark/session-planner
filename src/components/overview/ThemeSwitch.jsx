import React from 'react';
import { connect } from 'react-redux';
import { FaSunO, FaMoonO } from 'react-icons/lib/fa';

import { setLightTheme, setDarkTheme } from '../../lib/state/reducers/theme';

import './ThemeSwitch.less';

class ThemeSwitch extends React.Component {
  toggleTheme() {
    const { theme, dispatch } = this.props;
    if(theme.name === 'dark') {
      dispatch(setLightTheme());
    }else{
      dispatch(setDarkTheme());
    }
  }

  renderIcon() {
    if(this.props.theme.name === 'dark') {
      return (<span><FaSunO /> Light theme</span >);
    }else{
      return (<span><FaMoonO /> Dark theme</span>);
    }

  }

  render() {
    return (
      <button className="theme-switch" onClick={() => this.toggleTheme()}>{this.renderIcon()}</button>
    );
  }
}

export default connect(({ theme }) => {
  return { theme };
})(ThemeSwitch);