import React from 'react';
import { normalizeScore, barStyles, limitNumberPrecision } from '../util';
import '../css/scores.css';

const twoDecimal = limitNumberPrecision(2);

const Bar = props => (
  <div
    className={`scores__item ${props.className}`}
    style={barStyles(props.score)}
  >
    <span className="scores__item__label">{props.label}</span>
    <strong className="scores__item__score">{twoDecimal(props.score)}</strong>
  </div>
);

const Scores = props => (
  <div className="scores">
    <Bar
      className="scores__item--average"
      score={props.average}
      label="Score"
    />

    {props.ratings.map(rating => (
      <Bar
        key={rating.Source}
        score={normalizeScore(rating.Value)}
        label={rating.Source}
      />
    ))}
  </div>
);

export default Scores;
