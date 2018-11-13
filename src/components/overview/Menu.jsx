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
    <a className="menuItem" href="#">Day 1</a>
    <a className="menuItem" href="#">Day 2</a>
    <a className="menuItem" href="#">Day 3</a>
    <div className="divider" />

    <a className="menuItem" href="#">Floor plan</a>
    <div className="divider" />

    <ThemeSwitch />
    <div className="divider" />
  </ReduxSlideMenu>
)