import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { slide as Menu } from './components/overview/Menu';
import ThemeSwitch from './components/overview/ThemeSwitch';

import Slots from './components/overview/Slots';
import Screen from './components/screen/Screen';

export const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Route exact path="/" component={() => <Slots />} />
      <Route path="/screen" component={() => <Screen />} />
    </React.Fragment>
  </Router>
);


const styles = {
  bmOverlay: {
    background: 'var(--background-primary)'
  }
}
export const MenuRouter = () => (
  <Router>
      <React.Fragment>
      <Route exact path="/" component={ ()=> (
        <Menu styles={styles}>
          <a className="menuItem" href="#">Day 1</a>
          <a className="menuItem" href="#">Day 2</a>
          <a className="menuItem" href="#">Day 3</a><br />

          <a className="menuItem" href="#">Floor plan</a><br />

          <ThemeSwitch />
        </Menu>)
      }/>
      </React.Fragment>
  </Router>
);
