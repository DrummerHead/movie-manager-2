import React from 'react';
import '../css/datalist.css';

const DataList = props => (
  <div className="datalist">
    {props.select.filter(key => props.data[key] !== 'N/A').map(key => (
      <div className="datalist__tuple" key={key}>
        <div className="datalist__title">
          {key}
        </div>
        <div className="datalist__data">
          {props.data[key]}
        </div>
      </div>
    ))}
  </div>
);

export default DataList;
