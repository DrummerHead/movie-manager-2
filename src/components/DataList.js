import React from 'react';
import '../css/datalist.css';
import '../css/copy-text.css';

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

  // Welcome to the jungle
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
  if (check(props.data.pwd)) {
    addToProps = {
      data: {
        ...addToProps.data,
        Folder: {
          label: 'Open folder',
          url: props.data.pwd,
          isFileURL: true,
        },
      },
      select: [...addToProps.select, 'Folder'],
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

class CopyText extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showURL: false,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow(ev) {
    ev.preventDefault();
    this.setState({
      showURL: true,
    });
    setTimeout(() => this.input.select(), 100);
  }

  render() {
    return (
      <div
        className={`copy-text ${this.state.showURL ? 'copy-text--show-url' : ''} ${this.props.className}`}
      >
        <a href="" className="copy-text__trigger" onClick={this.handleShow}>
          Copy Folder Path
        </a>
        <input
          type="text"
          defaultValue={`open "${this.props.data.url}"`}
          className="copy-text__input"
          ref={input => (this.input = input)}
        />
      </div>
    );
  }
}

const DataParse = props => {
  // This stuff is nasty
  if (typeof props.data === 'object') {
    if (props.data.isFileURL) {
      return <CopyText data={props.data} className="datalist__data" />;
    } else {
      return (
        <a href={props.data.url} className="datalist__data">
          {props.data.label}
        </a>
      );
    }
  } else {
    return <div className="datalist__data">{props.data}</div>;
  }
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
