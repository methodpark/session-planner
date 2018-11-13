import React from 'react';

import { slide as SlideMenu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu';

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

export const Menu = () => (
  <ReduxSlideMenu styles={styles}>
    <a className="menuItem" href="/sessions">Today's sessions</a>
    <a className="menuItem" href="/floor-plan">Floor plan</a>
    <div className="divider" />

    <ThemeSwitch />
    <div className="divider" />
  </ReduxSlideMenu>
)