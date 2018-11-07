import React from 'react';
import { connect } from 'react-redux';

import Entry from './Entry';
import Filters from './Filters';

import './Slots.less';

class Slots extends React.Component {
  render() {
    return (
      <div>
        <Filters />
        <ul id="slots">
          {this.props.slots.map(slot => <Entry key={slot.title} slot={slot} />)}
        </ul>
      </div>
    );
  }
}

export default connect(({slots, filters}) => {
  // TODO: Zeitzonendinge?
  const startsInFuture = (slot) => new Date(slot.start).getHours() >= new Date().getHours();
  const futureSlots = slots.map(slot => ({...slot, filtered: filters.onlyInFuture && !startsInFuture(slot)}));
  return { slots: futureSlots };
})(Slots);