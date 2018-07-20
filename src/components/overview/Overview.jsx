import React from 'react';

import TypeChooser from './TypeChooser';
import Tracks from './Tracks';
import Slots from './Slots';

export default class Overview extends React.Component {
  constructor() {
    super();
    this.state = { what: 'tracks' };
  }

  render() {
    return (
      <div>
        <TypeChooser what={this.state.what} onChange={what => this.setState({ what })} />

        {this.state.what === 'slots' ? <Slots slots={this.props.slots} /> : null}
        {this.state.what === 'tracks' ? <Tracks tracks={this.props.tracks} /> : null}
      </div>
    );
  }
}