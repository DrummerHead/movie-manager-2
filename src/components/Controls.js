import React from 'react';
import config from '../config';
import '../css/controls.css';
import '../css/button.css';

const Button = ({ activeOption, onClick }) => ({ option, label = option }) => (
  <button
    className={`button ${activeOption === option ? 'button--active' : ''}`}
    onClick={() => onClick(option)}
  >
    {label}
  </button>
);

class Controls extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  }

  render() {
    const ButtonFilter = Button({
      activeOption: this.props.filteredBy,
      onClick: this.props.setFilter,
    });
    const ButtonSort = Button({
      activeOption: this.props.sortedBy,
      onClick: this.props.setSort,
    });

    return (
      <header
        className={`controls ${this.state.visible ? '' : 'controls--hidden'}`}
      >
        <div className="controls__group">
          <span className="controls__label">Audience:</span>
          <ButtonFilter option="All" />
          {config.people.map(person => (
            <ButtonFilter key={person} option={person} />
          ))}
        </div>
        <div className="controls__group">
          <span className="controls__label">Sort By:</span>
          <ButtonSort option="averageScore" label="Score" />
          <ButtonSort option="duration" />
          <ButtonSort option="revenue" />
          <ButtonSort option="Year" />
          <ButtonSort option="diskSpaceKb" label="Size" />
        </div>
        <div className="controls__group">
          <span className="controls__label">Sort order:</span>
          <button className="button" onClick={this.props.toggleSortDirection}>
            {this.props.sortDescending ? 'Higher first' : 'Lower first'}
          </button>
        </div>
        <span className="controls__latch" onClick={this.toggle}>
          {this.state.visible ? '▲' : '▼'}
        </span>
      </header>
    );
  }
}

export default Controls;
