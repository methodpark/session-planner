import React, { Component } from 'react';
import * as moment from 'moment';

class App extends Component {
  constructor() {
    super();

    this.state = {schedule: null};
  }

  componentDidMount() {
    fetch('/sessions')
      .then(response => response.json())
      .then(result => this.setState({schedule: result}));
  }

  render() {
    if (this.state.schedule === null) {
      return <div>loading</div>;
    }

    const tracks = Object.keys(this.state.schedule).map(trackKey => {
      const track = this.state.schedule[trackKey];
      const sessions = track.map(session => {
        return (
          <li key={session.id}>
            <h4>{session.title}</h4>
            <span className="time">{moment(session.start).format('HH:mm')} - {moment(session.end).format('HH:mm')}</span>
          </li>
        )
      });

      return (
        <li key={trackKey}>
          <h3>{trackKey}</h3>
          <ul className="sessions">{sessions}</ul>
        </li>
      );
    });

    return <ul className="tracks">{tracks}</ul>;
  }
}

export default App;
