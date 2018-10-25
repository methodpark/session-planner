import React from 'react';
import {connect} from 'react-redux';

function Screen(props) {
  const {sessions, slots, rooms} = props;

  return (
    <table id="screen">
      <tbody>
        <tr>
          <th></th>
          {
            rooms.map(room => {
              return <th>{room}</th>;
            })
          }
        </tr>
      {
        slots.map(slot => {
          return (
            <tr>
              <th>{slot}</th>
              {
                rooms.map(room => {
                  const session = getSession(sessions, room, slot);

                  let title = '';
                  if (session) {
                    title = session.title;
                  }

                  return <td>{title}</td>;
                })
              }
            </tr>
          );
        })
      }
      </tbody>
    </table>
  )
}

function getSession(sessions, room, slot) {
  return sessions.find(session => session.room == room && session.slot === slot);
}

export default connect(state => state)(Screen);