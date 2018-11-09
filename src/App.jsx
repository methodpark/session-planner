import React from 'react';

import AppRouter from './AppRouter';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import AddToHomeScreenPrompt from './components/overview/AddToHomeScreenPrompt';

const App = () => (
  <React.Fragment>
    <Header />
    <AppRouter {...this.state} />
    <AddToHomeScreenPrompt />
    <Footer />
  </React.Fragment>
);

export default App;
