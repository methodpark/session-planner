import React from 'react';

import AppRouter from './AppRouter';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import AddToHomeScreenPrompt from './components/overview/AddToHomeScreenPrompt';

import { slide as Menu } from './components/overview/Menu';
import ThemeSwitch from './components/overview/ThemeSwitch';

const styles = {
  bmOverlay: {
    background: 'var(--background-primary)'
  }
}
const App = () => (
  <React.Fragment>

    <nav>
      <Menu styles={styles}>
        <a href="#" >Day 1</a>
        <a href="#" >Day 2</a>
        <a href="#" >Day 3</a><br />

        <a href="#" >Floor plan</a><br />

        <ThemeSwitch />
      </Menu>
    </nav>
    <div id="main-container">
      <Header />
      <AppRouter {...this.state} />
      <AddToHomeScreenPrompt />
      <Footer />
    </div>
  </React.Fragment>
);

export default App;
