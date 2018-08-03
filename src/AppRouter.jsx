import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Overview from './components/overview/Overview';
import SessionDetail from './components/detail/Detail';

export default class AppRouter extends React.Component {
  render() {
    const { tracks, slots, sessions } = this.props;

    return (
      <Router>
        <div>
          <Route exact path="/" component={() => <Overview tracks={tracks} slots={slots} />} />
          <Route exact path="/session/:sessionId" component={({ match }) => {
            const sessionId = parseInt(match.params.sessionId, 10);
            const session = sessions.find(session => session.id === sessionId);

            if (!session) {
              return <Redirect to={'/'} />;
            }

            return <SessionDetail {...session} />;
          }} />
        </div>
      </Router>
    );   
  }
}