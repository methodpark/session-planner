import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import ArrowLeft from 'react-icons/lib/fa/arrow-left';

export default class SessionDetail extends React.Component {
  render () {
    const {title, description, start, end} = this.props;

    const startFormatted = moment(start).format('HH:mm');
    const endFormatted = moment(end).format('HH:mm');

    return (
      <div id="session-detail">
        <Link to="/"><ArrowLeft /></Link>

        <h2>
          {title}
          <span className="time">{startFormatted} - {endFormatted}</span>
        </h2>
        <div dangerouslySetInnerHTML={{__html: description}}></div>
      </div>
    );
  }
}