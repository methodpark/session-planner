import React from 'react';

export default function Session({session}) {
  return <td>{session ? session.title : ''}</td>
}