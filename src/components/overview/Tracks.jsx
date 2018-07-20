import React from 'react';

import {TrackEntry} from './Entry';

export default class Tracks extends React.Component {
  render() {
    const tracks = this.props.tracks.map(track => {
      return <TrackEntry key={track.trackId} {...track} />;
    });

    return <ul id="overview-entries">{tracks}</ul>;
  }
}