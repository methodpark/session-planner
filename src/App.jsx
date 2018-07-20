import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Overview from './components/overview/Overview';
import SessionDetail from './components/detail/Detail';

class App extends Component {
  constructor() {
    super();

    this.state = { tracks: null };
  }

  componentDidMount() {
    fetch('/sessions')
      .then(response => {
        if (response.status !== 200) return null;

        return response.json()
      })
      .then(result => this._handleData(result))
      // .catch(error => console.log(error.message));
  }

  _handleData(tracks) {
    this.setState({tracks});

    const slotsGrouped = {};
    tracks.forEach(track => {
      const {sessions, ...trackCopy} = track;

      sessions.forEach(session => {
        const slot = `${session.start} - ${session.end}`;
        
        session.track = trackCopy;

        if (!slotsGrouped[slot]) {
          slotsGrouped[slot] = []
          slotsGrouped[slot].start = session.start;
          slotsGrouped[slot].end = session.end;
        }

        slotsGrouped[slot].push(session);
      });
    });

    const slots = Object.keys(slotsGrouped).map(key => {
      const slot = slotsGrouped[key];

      return {
        slotId: key,
        start: slot.start,
        end: slot.end,
        sessions: Array.from(slot)
      };
    });
    
    this.setState({slots: slots});
  }

  render() {
    const { tracks, slots } = this.state;

    if (tracks === null) {
      return <div id="loading">loading</div>;
    }

    return (
      <Router>
        <div>
          <Route exact path="/" component={() => <Overview tracks={tracks} slots={slots} />} />
          <Route exact path="/session/:sessionId" component={({ match }) => {
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