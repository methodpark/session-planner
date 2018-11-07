import React from 'react';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Session from './Session';

export class Entry extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      localOpen: null
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const localOpen = this.state.localOpen === null ? !this.state.open : !this.state.localOpen;
    this.setState({ localOpen });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      open: props.slot.active,
      localOpen: state.localOpen
    };
  }

  render() {
    const { slot, sessions } = this.props;

    let open = this.state.open;
    if (this.state.localOpen !== null) {
      open = this.state.localOpen;
    }

    const listClassName = classnames('sessions', { open });

    if(sessions.length === 0) {
      return '';
    }

    return (
      <li className="entry">
        <h3 onClick={this.toggle}>
          {slot.title}{open ? <Minus /> : <Plus />}
        </h3>

        <ul className={listClassName}>
          {sessions.map(session => <Session key={session.id} {...session} />)}
        </ul>
      </li>
    );
  }
}

export default connect(({ sessions, filters, favorites }, { slot }) => {
  const isFavorite = (id) => favorites.find(favId => favId === id) !== undefined;

  return {
    slot,
    sessions: sessions
                .filter(session => session.slot === slot.title)
                .map(session => ({...session, filtered: filters.onlyFavorites && !isFavorite(session.id)}))
  }
})(Entry);
