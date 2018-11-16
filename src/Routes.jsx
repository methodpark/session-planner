import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu  from './components/overview/Menu';

import Slots from './components/overview/Slots';
import Screen from './components/screen/Screen';
import Floors from './components/floorPlan/FloorPlan';

export const AppRoutes = () => (
    <React.Fragment>
      <Switch>
        <Route exact path="/floor-plan" component={() => <Floors />} />
        <Route exact path="/screen" component={() => <Screen />} />
        <Route path="/" component={() => <Slots />} />
      </Switch>
    </React.Fragment>
);

export const MenuRoutes = () => (
      <Switch>
        <Route exact path="/screen" component={() => ''} />
        <Route render={() => (<Menu />)} />
      </Switch>
);
