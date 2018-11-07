import React from 'react';
import { connect } from 'react-redux';

import Entry from './Entry';
import Filters from './Filters';

class Slots extends React.Component {
  render() {
    return (
      <div>
        <Filters />
        <ul id="slots">
          {this.props.slots.map(slot => <Entry key={slot.title} slot={slot}/>)}
        </ul>
      </div>
    );
  }
}

export default connect(({slots, filters}) => {
  // TODO: Zeitzonendinge?
  const startsInFuture = (slot) => new Date(slot.start).getTime() - new Date().getTime() > 0;
  const futureSlots = slots.filter(slot => !filters.onlyInFuture || startsInFuture(slot));
  return { slots: futureSlots.length === 0 ? slots : futureSlots };
})(Slots);