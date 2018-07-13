import React from 'react';
import { Link } from "react-router-dom";
import * as moment from 'moment';

import ArrowLeft from 'react-icons/lib/fa/arrow-left';

export default class SessionDetail extends React.Component {
  render () {
    const {title, description, start, end} = this.props;

    const startFormatted = moment(start).format('HH:mm');
    const endFormatted = moment(end).format('HH:mm');

    return (
      <div id="session">
        <Link to="/"><ArrowLeft /></Link>

        <h2>{title}</h2>
        <div className="time">{startFormatted} - {endFormatted}</div>
        <div dangerouslySetInnerHTML={{__html: description}}></div>
      </div>
    );
  }
}