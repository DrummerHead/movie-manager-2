import React from 'react';
import { normalizeScore, barStyles } from '../util';

const Scores = props => {
  return (
    <div className="scores">
      <div
        className="scores__item scores__item--average"
        style={barStyles(props.average)}
      >
        <span>Score</span>
        <strong>{props.average}</strong>
      </div>

      {props.ratings.map(rating => (
        <div
          className="scores__item"
          key={rating.Source}
          style={barStyles(normalizeScore(rating.Value))}
        >
          <span>{rating.Source}</span>
          <span>{rating.Value}</span>
          <strong>{normalizeScore(rating.Value)}</strong>
        </div>
      ))}
    </div>
  );
};

export default Scores;
