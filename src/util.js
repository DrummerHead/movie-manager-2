export const normalizeScore = number => {
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

export const averageScores = scores =>
  scores.reduce((acc, curr) => acc + normalizeScore(curr.Value), 0) / scores.length
