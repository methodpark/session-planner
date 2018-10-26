import React from 'react';
import {connect} from 'react-redux';

import Entry from './Entry';

class Slots extends React.Component {
  render() {
    return (
      <ul id="slots">
        {this.props.slots.map(slot => <Entry key={slot.title} slot={slot}/>)}
      </ul>
    );
  }
}

export default connect(state => {
  return {slots: state.slots};
})(Slots);