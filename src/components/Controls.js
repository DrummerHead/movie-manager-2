import React from 'react';
import config from '../config';
import '../css/controls.css';
import '../css/button.css';

const Button = props => (
  <button
    className={`button ${props.activeOption === props.option ? 'button--active' : ''}`}
    onClick={() => props.onClick(props.option)}
  >
    {props.option}
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
    return (
      <header
        className={`controls ${this.state.visible ? '' : 'controls--hidden'}`}
      >
        <div className="controls__group">
          <span className="controls__label">
            Audience:
          </span>
          <Button
            onClick={this.props.setFilter}
            activeOption={this.props.filteredBy}
            option="All"
          />
          {config.people.map(person => (
            <Button
              key={person}
              onClick={this.props.setFilter}
              activeOption={this.props.filteredBy}
              option={person}
            />
          ))}
        </div>
        <div className="controls__group">
          <span className="controls__label">
            Sort By:
          </span>
          <Button
            onClick={this.props.setSort}
            activeOption={this.props.sortedBy}
            option="averageScore"
          />
          <Button
            onClick={this.props.setSort}
            activeOption={this.props.sortedBy}
            option="duration"
          />
          <Button
            onClick={this.props.setSort}
            activeOption={this.props.sortedBy}
            option="revenue"
          />
          <Button
            onClick={this.props.setSort}
            activeOption={this.props.sortedBy}
            option="Year"
          />
        </div>
        <span className="controls__latch" onClick={this.toggle}>
          {this.state.visible ? '▲' : '▼'}
        </span>
      </header>
    );
  }
}

export default Controls;
