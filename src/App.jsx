import React from 'react';

import AppRouter from './AppRouter';
import {AddToHomeScreenPrompt} from './components/overview/AddToHomeScreenPrompt';

const App = () => <React.Fragment>
  <AppRouter {...this.state} />
  <AddToHomeScreenPrompt />
</React.Fragment>;

export default App;
