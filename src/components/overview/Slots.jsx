import React from 'react';

import {SlotEntry} from './Entry';

export default class Slots extends React.Component {
  render() {
    return (
      <ul id="overview-entries">
        {this.props.slots.map(slot => <SlotEntry key={slot.slotId} {...slot} />)}
      </ul>
    );
  }
}