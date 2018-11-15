import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FaMoonO } from 'react-icons/lib/fa';

import ToggleButton from './ToggleButton';
import { setLightTheme, setDarkTheme } from '../../lib/state/reducers/theme';

import './ThemeSwitch.less';
import './ToggleButton.less';

class ThemeSwitch extends React.Component {
  toggleTheme() {
    const { theme, dispatch } = this.props;
    if(theme.name === 'dark') {
      dispatch(setLightTheme());
    }else{
      dispatch(setDarkTheme());
    }
  }

  renderButtonContent() {
    const { name } = this.props.theme;
    const isDark = name === 'dark';

    return (<Fragment>
      <FaMoonO /> Dark theme
      <ToggleButton checked={isDark} />
    </Fragment>);
  }

  render() {
    return (
      <button className="theme-switch" onClick={() => this.toggleTheme()}>{this.renderButtonContent()}</button>
    );
  }
}

export default connect(({ theme }) => {
  return { theme };
})(ThemeSwitch);