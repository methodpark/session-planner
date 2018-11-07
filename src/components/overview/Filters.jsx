import React from 'react';
import { connect } from 'react-redux';
import { FaHeart, FaFilter, FaClockO } from 'react-icons/lib/fa';
import classnames from 'classnames';

import { setFavoritesFilter, setOnlyInFutureFilter } from '../../lib/state/filterState';

export class Filters extends React.Component {
  toggleFavoriteFilter() {
    const { filters, dispatch } = this.props;
    dispatch(setFavoritesFilter(!filters.onlyFavorites));
  }

  toggleFutureFilter() {
    const { filters, dispatch } = this.props;
    dispatch(setOnlyInFutureFilter(!filters.onlyInFuture));
  }

  render() {
    return (
        <div class="filters">
          <FaFilter />
          <button className={classnames({ active: this.props.filters.onlyFavorites })}
            title="Show only favorited"
            onClick={() => this.toggleFavoriteFilter()}><FaHeart /></button>
          <button className={classnames({ active: this.props.filters.onlyInFuture })}
            title="Show only future sessions"
            onClick={() => this.toggleFutureFilter()}><FaClockO /></button>
        </div>
    );
  }
}

export default connect(({ filters }) => {
  return { filters };
})(Filters);