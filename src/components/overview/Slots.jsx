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

export default connect(({slots}) => {
  return { slots };
})(Slots);