import React from 'react';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';
import { connect } from 'react-redux';
import classnames from 'classnames';

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
    const listClassName = classnames('sessions', {open: this.state.open} );

    return (
      <li className="entry">
        <h3 onClick={this.toggle}>
          {slot.title}{this.state.open ? <Minus /> : <Plus />}
        </h3>

        <ul className={listClassName}>
          {sessions.map(session => <Session key={session.id} {...session} />)}
        </ul>
      </li>
    );
  }
}

export default connect(({sessions}, {slot}) => {
  return {
    slot,
    sessions: sessions.filter(session => session.slot === slot.title)
  }
})(Entry);