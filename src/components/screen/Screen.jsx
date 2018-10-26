import React from 'react';
import {connect} from 'react-redux';

import Session from './Session';

function Screen(props) {
  const {sessions, slots, rooms} = props;

  return (
    <table id="screen">
      <tbody>
        <tr>
          <th></th>
          {rooms.map(room => <th key={room}>{room}</th>)}
        </tr>
      {
        slots.map(slot => {
          const {title, active} = slot;

          return (
            <tr key={title} className={active ? 'active' : ''}>
              <th>{title}</th>
              {rooms.map(room => <Session key={room + title} session={getSession(sessions, room, title)} />)}
            </tr>
          );
        })
      }
      </tbody>
    </table>
  )
}

function getSession(sessions, room, slot) {
  return sessions.find(session => session.room === room && session.slot === slot);
}

export default connect(state => state)(Screen);