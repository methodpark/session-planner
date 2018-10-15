import React, { Component } from 'react';

import AppRouter from './AppRouter';

export class App extends Component {

  render() {
    return <AppRouter {...this.state} />;
  }
}

export default App;