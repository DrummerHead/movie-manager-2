export const normalizeScore = number => {
  const isPercentage = /%/.test(number);

  if (isPercentage) {
    return parseInt(number, 10);
  } else {
    const [, score, total] = /([^/]*)\/([^/]*)/.exec(number);
    if (total === '10') {
      return parseFloat(score) * 10;
    } else if (total === '100') {
      return parseInt(number, 10);
    }
  }
};

export const averageScores = scores =>
  scores.reduce((acc, curr) => acc + normalizeScore(curr.Value), 0) /
  scores.length;

export const barStyles = score => {
  const linear0100toMinMax = (value, min, max) => {
    const n = value * (max - min) / 100 + min;
    return [Math.floor(n), Math.ceil(n)];
  };

  const interpolateColors = (value, colors) => {
    if (colors.length === 2) {
      return `rgb(${linear0100toMinMax(value, colors[0].r, colors[1].r)[0]},${linear0100toMinMax(value, colors[0].g, colors[1].g)[0]},${linear0100toMinMax(value, colors[0].b, colors[1].b)[0]})`;
    } else {
      const numColors = colors.length - 1;
      const colorIndexes = linear0100toMinMax(value, 0, numColors);
      const newValue = (value - 100 / numColors * colorIndexes[0]) * numColors;
      return interpolateColors(newValue, [
        colors[colorIndexes[0]],
        colors[colorIndexes[1]],
      ]);
    }
  };

  return {
    width: score + '%',
    backgroundColor: interpolateColors(score, [
      { r: 215, g: 0, b: 0 },
      { r: 255, g: 152, b: 0 },
      { r: 240, g: 240, b: 70 },
      { r: 160, g: 210, b: 0 },
      { r: 0, g: 110, b: 0 },
    ]),
  };
};
