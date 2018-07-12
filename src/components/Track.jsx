import React from 'react';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';

import Session from './Session';

export default class Track extends React.Component {
  constructor() {
    super();

    this.state = {open: false};
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const {sessions, name, room} = this.props;
    const sessionEntries = sessions.map(session => <Session key={session.id} {...session} />);

    return (
      <li className="track">
        <h3 onClick={() => this.toggle()}>
          {name} - {room}
          {this.state.open ? <Minus /> : <Plus />}
        </h3>
        { this.state.open ? <ul className="sessions">{sessionEntries}</ul> : null }
      </li>
    );
  }
}