import React, { Component } from 'react';

import Track from './components/Track';

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

      return <Track key={trackKey} trackKey={trackKey} sessions={track} />;
    });

    return <ul id="tracks">{tracks}</ul>;
  }
}

export default App;
