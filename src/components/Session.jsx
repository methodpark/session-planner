import React from 'react';
import * as moment from 'moment';

export default class Session extends React.Component {
  render () {
    const {title, start, end} = this.props.data;

    const startFormatted = moment(start).format('HH:mm');
    const endFormatted = moment(end).format('HH:mm');

    return (
      <li>
        <h4>{title}</h4>
        <span className="time">{startFormatted} - {endFormatted}</span>
      </li>
    )
  }
}