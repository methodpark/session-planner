import React from 'react';
import { connect } from 'react-redux';
import Heart from 'react-icons/lib/fa/heart';
import Filter from 'react-icons/lib/fa/filter';
import classnames from 'classnames';

import Entry from './Entry';
import { setFavoritesFilter } from '../../lib/state/filterState';

class Slots extends React.Component {
  toggleFavoriteFilter() {
    const {filters, dispatch} = this.props;
    dispatch(setFavoritesFilter(!filters.onlyFavorites));
  }

  render() {
    return (
      <div>
        <div class="filters">
          <Filter />
          <button className={classnames({active: this.props.filters.onlyFavorites})}
                  title="Show only favorited"
                  onClick={() => this.toggleFavoriteFilter()}><Heart /></button>
        </div>
        <ul id="slots">
          {this.props.slots.map(slot => <Entry key={slot.title} slot={slot}/>)}
        </ul>
      </div>
    );
  }
}

export default connect(({slots, filters}) => {
  return { slots, filters };
})(Slots);