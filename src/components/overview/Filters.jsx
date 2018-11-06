import React from 'react';
import { connect } from 'react-redux';
import Heart from 'react-icons/lib/fa/heart';
import Filter from 'react-icons/lib/fa/filter';
import classnames from 'classnames';

import { setFavoritesFilter } from '../../lib/state/filterState';

class Filters extends React.Component {
  toggleFavoriteFilter() {
    const { filters, dispatch } = this.props;
    dispatch(setFavoritesFilter(!filters.onlyFavorites));
  }

  render() {
    return (
        <div class="filters">
          <Filter />
          <button className={classnames({ active: this.props.filters.onlyFavorites })}
            title="Show only favorited"
            onClick={() => this.toggleFavoriteFilter()}><Heart /></button>
        </div>
    );
  }
}

export default connect(({ filters }) => {
  return { filters };
})(Filters);