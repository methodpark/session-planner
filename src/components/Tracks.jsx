import React from 'react';

import Track from './Track';

export default class Tracks extends React.Component {
  render() {
    const tracks = Object.values(this.props.tracks)
      .map(track => <Track key={track.name} {...track} />);

    return <ul id="tracks">{tracks}</ul>;
  }
}