import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

export default function Session (props) {
  const {id, title, subTitle} = props;

  return (
    <li>
      <h4>
        <Link to={'/session/' + id}>{title}</Link>
      </h4>
      <span className="subTitle">{subTitle}</span>
    </li>
  );
}

export function SessionWithRoom(props) {
  return <Session id={props.id} title={props.title} subTitle={props.room} />;
}

export function SessionWithTime(props) {
  const startFormatted = moment(props.start).format('HH:mm');
  const endFormatted = moment(props.end).format('HH:mm');

  return <Session id={props.id} title={props.title} subTitle={`${startFormatted} - ${endFormatted}`} />;
}