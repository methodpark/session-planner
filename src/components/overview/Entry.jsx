import React from 'react';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';
import * as moment from 'moment';

import {SessionWithRoom, SessionWithTime} from './Session';

export default class Entry extends React.Component {
  constructor() {
    super();

    this.state = {open: false};
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const {title, subTitle, sessions} = this.props;
    const sessionEntries = sessions.map(session => this.props.children(session));

    return (
      <li className="entry">
        <h3 onClick={() => this.toggle()}>
          {title}{this.state.open ? <Minus /> : <Plus />}
          <div className="sub-title">{subTitle}</div>
        </h3>
        { this.state.open ? <ul className="sessions">{sessionEntries}</ul> : null }
      </li>
    );
  }
}

export function TrackEntry({name, room, sessions}) {
  return (
    <Entry title={name} subTitle={room} sessions={sessions}>
      {session => <SessionWithTime key={session.id} {...session} />}
    </Entry>
  );
}

export function SlotEntry({start, end, sessions}) {
  const startFormatted = moment(start).format('HH:mm');
  const endFormatted = moment(end).format('HH:mm');
  const title = `${startFormatted} - ${endFormatted}`;

  return (
    <Entry title={title} sessions={sessions}>
      {session => <SessionWithRoom key={session.id} room={session.track.room} {...session} />}
    </Entry>
  );
}