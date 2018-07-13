import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Tracks from './components/Tracks';
import SessionDetail from './components/SessionDetail';

class App extends Component {
  constructor() {
    super();

    this.state = {tracks: null};
  }

  componentDidMount() {
    fetch('/sessions')
      .then(response => response.json())
      .then(result => this.setState({tracks: result}));
  }

  render() {
    const {tracks} = this.state;

    if (tracks === null) {
      return <div id="loading">loading</div>;
    }

    return (
      <Router>
        <div>
          <Route exact path="/" component={() => <Tracks tracks={tracks} />} />
          <Route exact path="/session/:sessionId" component={({match}) => {
            const session = getSessionBySessionId(tracks, match.params.sessionId);

            if (!session) return <Redirect to={'/'} />

            return <SessionDetail {...session} />
          }} />
        </div>
      </Router>
    );
  }
}

function getSessionBySessionId(tracks, sessionId) {
  sessionId = parseInt(sessionId, 10);

  return Object.values(tracks).reduce((carry, track) => {
    if (carry) return carry;

    return track.sessions.find(session => session.id === sessionId);
  }, undefined)
}

export default App;