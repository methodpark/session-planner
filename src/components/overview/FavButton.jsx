import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Heart from 'react-icons/lib/fa/heart';

import { unsetFavorite, setFavorite } from '../../lib/state/reducers/favorites';


class FavButton extends React.Component {
  toggle() {
    const { id, isFavorite, dispatch } = this.props;
    if (isFavorite) {
      dispatch(unsetFavorite(id));
    } else {
      dispatch(setFavorite(id));
    }
  }

  render() {
    const { isFavorite, hiddenByFilter } = this.props;

    const classes = classnames('favorite', { active: isFavorite }, {hidden:hiddenByFilter});

    return (
      <button className={classes} onClick={() => this.toggle()}>
        <Heart />
      </button>
    );
  }
}

function mapStateToProps({ favorites, filters }, { id }) {
  const isFavorite = favorites.find(favId => favId === id) !== undefined;
  return {
    isFavorite,
    hiddenByFilter: filters.onlyFavorites && isFavorite
  };
}

export default connect(mapStateToProps)(FavButton);
