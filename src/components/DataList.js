import React from 'react';
import '../css/datalist.css';

const minutesToHours = minutes => {
  const minutesInt = parseInt(minutes, 10);
  const hoursFinal = parseInt(minutesInt / 60, 10);
  const minutesFinal = `${minutesInt % 60}`.padStart(2, '0');
  return `${hoursFinal}:${minutesFinal}`;
};

const kbToH = kb => {
  if (kb < 1024) {
    return `${kb} Kb`;
  } else if (kb < 1048576) {
    return `${(kb / 1000).toFixed(0)} Mb`;
  } else if (kb < 1073741824) {
    return `${(kb / 1000 / 1000).toFixed(2)} Gb`;
  }
};

const addProps = props => {
  let addToProps = {
    data: {},
    select: [],
  };

  const check = value => value && value !== 'N/A';

  if (check(props.data.diskSpaceKb)) {
    addToProps = {
      data: {
        ...addToProps.data,
        Size: kbToH(props.data.diskSpaceKb),
      },
      select: [...addToProps.select, 'Size'],
    };
  }
  if (check(props.data.Website)) {
    addToProps = {
      data: {
        ...addToProps.data,
        Site: {
          label: props.data.Website,
          url: props.data.Website,
        },
      },
      select: [...addToProps.select, 'Site'],
    };
  }
  if (check(props.data.tomatoURL)) {
    addToProps = {
      data: {
        ...addToProps.data,
        Tomato: {
          label: 'Tomato page',
          url: props.data.tomatoURL,
        },
      },
      select: [...addToProps.select, 'Tomato'],
    };
  }
  if (check(props.data.imdbID)) {
    addToProps = {
      data: {
        ...addToProps.data,
        IMDB: {
          label: 'IMDB page',
          url: `http://www.imdb.com/title/${props.data.imdbID}/`,
        },
      },
      select: [...addToProps.select, 'IMDB'],
    };
  }
  if (check(props.data.Runtime)) {
    addToProps = {
      data: {
        ...addToProps.data,
        Runtime: minutesToHours(props.data.Runtime),
      },
      select: [...addToProps.select],
    };
  }

  return {
    data: {
      ...props.data,
      ...addToProps.data,
    },
    select: [...props.select, ...addToProps.select],
  };
};

const DataParse = props => {
  const isLink = typeof props.data === 'object';
  const data = isLink
    ? <a href={props.data.url}>{props.data.label}</a>
    : props.data;
  return <div className="datalist__data">{data}</div>;
};

const DataList = props => {
  const enrichedProps = addProps(props);
  return (
    <div className="datalist">
      {enrichedProps.select
        .filter(key => enrichedProps.data[key] !== 'N/A')
        .map(key => (
          <div className="datalist__tuple" key={key}>
            <div className="datalist__title">
              {key}
            </div>
            <DataParse data={enrichedProps.data[key]} />
          </div>
        ))}
    </div>
  );
};

export default DataList;
