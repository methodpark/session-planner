import React, { Component } from 'react';

import AppRouter from './AppRouter';
import Waiting from './components/Waiting';
class App extends Component {
  constructor() {
    super();

    this.state = { tracks: null, slots: null, session: null };
  }

  componentDidMount() {
    fetch('/sessions')
      .then(response => {
        if (response.status !== 200) throw new Error('could not load sessions');

        return response.json()
      })
      .then(result => this._handleData(result))
      .catch(error => console.error(error.message));
  }

  _handleData(tracks) {
    const allSessions = [];
    const slotsGrouped = {};
    tracks.forEach(track => {
      const {sessions, ...trackCopy} = track;

      sessions.forEach(session => {
        allSessions.push(session);
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

    setTimeout(() => this.setState({tracks, slots, sessions: allSessions}), 200);
  }

  render() {
    if (this.state.tracks === null) {
      return <Waiting />;
    }

    return <AppRouter {...this.state} />;
  }
}

export default App;