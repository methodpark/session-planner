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
          <Route exact path="/session/:sessionSlug" component={({ match }) => {
            const session = sessions.find(session => session.slug === match.params.sessionSlug);

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