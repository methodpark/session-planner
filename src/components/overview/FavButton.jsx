import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { setFavorite, unsetFavorite } from '../../lib/state/state';

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
    const { isFavorite } = this.props;

    const classes = classnames('favorite', { active: isFavorite });

    return (
      <button className={classes} onClick={() => this.toggle()}>
        ❤
      </button>
    );
  }
}

function mapStateToProps({ favorites }, { id }) {
  return { isFavorite: favorites.find(favId => favId === id) !== undefined };
}

export default connect(mapStateToProps)(FavButton);
