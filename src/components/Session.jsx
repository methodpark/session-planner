import React from 'react';
import { Link } from "react-router-dom";
import * as moment from 'moment';

export default class Session extends React.Component {
  render () {
    const {id, title, start, end} = this.props;

    const startFormatted = moment(start).format('HH:mm');
    const endFormatted = moment(end).format('HH:mm');

    return (
      <li>
        <h4>
          <Link to={'/session/' + id}>{title}</Link>
        </h4>
        <span className="time">{startFormatted} - {endFormatted}</span>
      </li>
    );
  }
}