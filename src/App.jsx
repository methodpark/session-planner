import React from 'react';
import { connect } from 'react-redux';

import {AppRouter, MenuRouter} from './Router';
import Footer from './components/shared/Footer';
import AddToHomeScreenPrompt from './components/overview/AddToHomeScreenPrompt';

import { action as setMenuOpen } from 'redux-burger-menu';
import Hammer from 'react-hammerjs';

const maxDistanceFromLeftBorder = 100;
const maxVerticalDistance = 100;
const minVelocity = 2;

class App extends React.Component {

  onSwipe(hammerEvent){
    if(hammerEvent.deltaX < 0) this.onSwipedLeft(hammerEvent);
    if(hammerEvent.deltaX > 0) this.onSwipedRight(hammerEvent);
  }

  onSwipedLeft(hammerEvent) {
    if (hammerEvent.velocityX < -minVelocity) {
      this.props.dispatch(setMenuOpen(false));
    }
  }

  onSwipedRight(hammerEvent) {
    if (hammerEvent.center.x - hammerEvent.deltaX < maxDistanceFromLeftBorder &&
      hammerEvent.velocityX > minVelocity &&
      hammerEvent.deltaY < maxVerticalDistance
    ) {
      this.props.dispatch(setMenuOpen(true));
    }
  }

  render() {
    return (
      <React.Fragment>
        <Hammer onSwipe={(hammerEvent) => this.onSwipe(hammerEvent)}>
        <div>
          <MenuRouter {...this.state} />
          <div id="main-container">
            <AppRouter {...this.state} />
            <AddToHomeScreenPrompt />
            <Footer />
          </div>
        </div>
        </Hammer>
      </React.Fragment>
    );
  }
}

export default connect()(App);
