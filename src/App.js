import React, { Component } from 'react';

import Track from './components/Track';

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
    if (this.state.tracks === null) {
      return <div>loading</div>;
    }

    const tracks = Object.keys(this.state.tracks).map(trackKey => {
      const track = this.state.tracks[trackKey];

      return <Track key={trackKey} {...track} />;
    });

    return <ul id="tracks">{tracks}</ul>;
  }
}

export default App;
