import React from 'react';
import '../css/datalist.css';

const DataParse = props => {
  const isLink = /^https?:\/\//.test(props.data);
  const data = isLink ? <a href={props.data}>{props.data}</a> : props.data;
  return <div className="datalist__data">{data}</div>;
};

const DataList = props => (
  <div className="datalist">
    {props.select.filter(key => props.data[key] !== 'N/A').map(key => (
      <div className="datalist__tuple" key={key}>
        <div className="datalist__title">
          {key}
        </div>
        <DataParse data={props.data[key]} />
      </div>
    ))}
  </div>
);

export default DataList;
