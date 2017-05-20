import React from 'react';

const barWidth = function(score){
  var linear0100toMinMax = function(value, min, max){
    var n = value * (max - min) / 100 + min;
    return [Math.floor(n), Math.ceil(n)];
  };
  var interpolateColors = function(value, colors){
    if(colors.length === 2){
      return 'rgb(' +
        linear0100toMinMax(value, colors[0].r, colors[1].r)[0] + ', ' +
        linear0100toMinMax(value, colors[0].g, colors[1].g)[0] + ', ' +
        linear0100toMinMax(value, colors[0].b, colors[1].b)[0] + ')';
    }
    else{
      var numColors = colors.length - 1;
      var colorIndexes = linear0100toMinMax(value, 0, numColors);
      var newValue = (value - ((100 / numColors) * colorIndexes[0])) * numColors;
      return interpolateColors(newValue, [colors[colorIndexes[0]], colors[colorIndexes[1]]]);
    }
  };
  return {
    'width' : score + '%',
    'background-color' : interpolateColors(
      score,
      [
        { r:215, g:0,   b:0   },
        { r:255, g:152, b:0   },
        { r:240, g:240, b:70  },
        { r:160, g:210, b:0   },
        { r:0,   g:110, b:0   }
      ]
    )
  };
};

var normalizeScore = number => {
  const isPercentage = /%/.test(number);

  if (isPercentage) {
    return parseInt(number, 10);
  } else {
    const [,score, total] = /([^/]*)\/([^/]*)/.exec(number);
    if (total === '10') {
      return parseFloat(score) * 10;
    } else if (total === '100') {
      return parseInt(number, 10);
    }
  }
};

var averageScores = scores =>
  scores.reduce((acc, curr) => acc + normalizeScore(curr.Value), 0) / scores.length

const Scores = props => {
  return (
    <div className='scores'>
      <div className='scores__item scores__item--average' style={barWidth(averageScores(props.ratings))}>
        <span>Score</span>
        <strong>{averageScores(props.ratings)}</strong>
      </div>

      {props.ratings.map(rating =>
        <div className='scores__item' key={rating.Source} style={barWidth(normalizeScore(rating.Value))}>
          <span>{rating.Source}</span>
          <span>{rating.Value}</span>
          <strong>{normalizeScore(rating.Value)}</strong>
        </div>
      )}
    </div>
  )
};

export default Scores;