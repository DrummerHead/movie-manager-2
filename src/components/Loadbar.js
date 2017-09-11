import React from 'react';
import '../css/loadbar.css';

const Loadbar = props => (
  <aside className="loadbar">
    <div className="loadbar__bar" style={{ width: `${props.percentage}%` }} />
  </aside>
);

export default Loadbar;
