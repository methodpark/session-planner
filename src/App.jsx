import React from 'react';

import {AppRouter, MenuRouter} from './Router';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import AddToHomeScreenPrompt from './components/overview/AddToHomeScreenPrompt';

const App = () => (
  <React.Fragment>
    <MenuRouter {...this.state} />
    <div id="main-container">
      <Header />
      <AppRouter {...this.state} />
      <AddToHomeScreenPrompt />
      <Footer />
    </div>
  </React.Fragment>
);

export default App;
