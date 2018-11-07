import React from 'react';

import './Waiting.less';

export default function Waiting() {
  return (
    <div id="waiting">
      <div>
        <div className="spinner"></div>
        <div className="spinner"></div>
      </div>
    </div>
  );
}