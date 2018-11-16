import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { slide as SlideMenu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu, action as setMenuOpen } from 'redux-burger-menu';
import classnames from 'classnames';


import './Menu.less';
import { isPushApiSupported } from '../../lib/notifications';
import ThemeSwitch from './ThemeSwitch';
import ToggleNotifications from './ToggleNotifications';

const ReduxSlideMenu = reduxBurgerMenu(SlideMenu);

const styles = {
  bmOverlay: {
    background: 'var(--background-primary)'
  },
  bmMenu: {
    height: 'auto'
  },
  bmMenuWrap: {
    width: 'auto'
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isMenuOpen: false };
  }

  setMenuState(menuState) {
    this.setState({...this.state, isMenuOpen: menuState.isOpen});
  }

  navigationEvent() {
    this.props.dispatch(setMenuOpen(false));
  }

  render() {
    return (
      <nav className={classnames({ 'menu-open': this.state.isMenuOpen})}>
        <ReduxSlideMenu onStateChange={(state) => this.setMenuState(state)} styles={styles}>
          <Link className="menuItem" to="/sessions" onClick={() => this.navigationEvent()}>Today's sessions</Link>
          <Link className="menuItem" to="/floor-plan" onClick={() => this.navigationEvent()}>Floor plan</Link>
          <div className="divider" />

          { isPushApiSupported() ? <ToggleNotifications /> : '' }
          <ThemeSwitch />
          <div className="divider" />
        </ReduxSlideMenu>
    </nav>);
  }
}

export default connect()(Menu);