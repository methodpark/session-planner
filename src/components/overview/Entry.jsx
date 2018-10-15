import React from 'react';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';
import { connect } from 'react-redux';

import Session from './Session';

export class Entry extends React.Component {
  constructor() {
    super();

    this.state = {open: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const {slot, sessions} = this.props;
    const sessionList = <ul className="sessions">
      {sessions.map(session => <Session key={session.id} {...session} />)}
    </ul>;

    return (
      <li className="entry">
        <h3 onClick={this.toggle}>
          {slot}{this.state.open ? <Minus /> : <Plus />}
        </h3>
        { this.state.open ? sessionList : null }
      </li>
    );
  }
}

export default connect(({sessions}, {slot}) => {
  return {
    slot,
    sessions: sessions.filter(session => session.slot === slot)
  }
})(Entry);