import React from 'react';
import '../css/loadbar.css';

const Loadbar = props => (
  <aside className="loadbar">
    <div
      className={`loadbar__bar ${props.complete ? 'loadbar__bar--complete' : ''}`}
      style={{ width: `${props.percentage}%` }}
    />
  </aside>
);

export default Loadbar;
