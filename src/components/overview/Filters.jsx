import React from 'react';
import { connect } from 'react-redux';
import { FaHeart, FaClockO } from 'react-icons/lib/fa';
import classnames from 'classnames';

import { setFavoritesFilter, setOnlyInFutureFilter } from '../../lib/state/filterState';

import './Filters.less';

export class Filters extends React.Component {
  toggleFavoriteFilter() {
    const { filters, dispatch } = this.props;
    dispatch(setFavoritesFilter(!filters.onlyFavorites));
  }

  toggleFutureFilter() {
    const { filters, dispatch } = this.props;
    dispatch(setOnlyInFutureFilter(!filters.onlyInFuture));
  }

  renderFavoritesFilter() {
    const { filters, favorites } = this.props;

    return (
      <button className={classnames({ active: filters.onlyFavorites })}
        title="Show only favorited"
        disabled={favorites.length === 0}
        onClick={() => this.toggleFavoriteFilter()}><FaHeart /> Only favorited</button>
    );
  }

  renderFutureFilter() {
    const { filters,  sessions } = this.props;
    const isInFuture = (session) => new Date(session.start).getHours() >= new Date().getHours();

    return (<button className={classnames({ active: filters.onlyInFuture })}
      title="Show only future sessions"
      disabled={sessions.length === 0 || isInFuture(sessions[0]) || !isInFuture(sessions[sessions.length-1])}
      onClick={() => this.toggleFutureFilter()}><FaClockO /> Only future slots</button>);
  }

  render() {
    return (
        <div className="filters">
          {this.renderFavoritesFilter()}
          {this.renderFutureFilter()}
        </div>
    );
  }
}

export default connect(({ favorites, filters, sessions }) => {
  return { favorites, filters, sessions };
})(Filters);