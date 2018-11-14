import React from 'react';

import { slide as SlideMenu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu';
import classnames from 'classnames';

import './Menu.less';
import ThemeSwitch from './ThemeSwitch';

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

export class Menu extends React.Component {

  constructor() {
    super();

    this.state = { isMenuOpen: false };
  }

  setMenuState(menuState) {
    this.setState({...this.state, isMenuOpen: menuState.isOpen});
  }

  render() {
    return (
      <nav className={classnames({ 'menu-open': this.state.isMenuOpen})}>
      <ReduxSlideMenu onStateChange={(state) => this.setMenuState(state)} styles={styles}>
        <a className="menuItem" href="/sessions">Today's sessions</a>
        <a className="menuItem" href="/floor-plan">Floor plan</a>
        <div className="divider" />

        <ThemeSwitch />
        <div className="divider" />
      </ReduxSlideMenu>
    </nav>);
  }
}