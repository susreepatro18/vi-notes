/**
 * Updated Statistical Analysis Engine for Anonymized Keystroke Dynamics
 */

const analyzeKeystrokes = (keystrokes) => {
  if (!keystrokes || keystrokes.length < 10) {
    return { score: 100, averageDwellTime: 'N/A', consistencyMetric: 'N/A', flags: ['Insufficient Data'] };
  }

  // Calculate dwell times from {down, up} pairs
  const dwellTimes = keystrokes
    .filter(k => k.up !== undefined)
    .map(k => k.up - k.down);

  if (dwellTimes.length < 5) {
    return { score: 100, averageDwellTime: 'N/A', consistencyMetric: 'N/A', flags: ['Short Session'] };
  }

  const totalDwell = dwellTimes.reduce((a, b) => a + b, 0);
  const avgDwell = totalDwell / dwellTimes.length;
  
  // Consistency Analysis (Standard Deviation of dwell times)
  const variance = dwellTimes.reduce((sum, d) => sum + Math.pow(d - avgDwell, 2), 0) / dwellTimes.length;
  const stdDev = Math.sqrt(variance);

  let score = 100;
  let flags = [];

  // Humans typically have stdDev > 15-20ms. Below 10 is very suspicious.
  if (stdDev < 8) {
    score -= 50;
    flags.push('Bot-like consistency detected in typing rhythm.');
  } else if (stdDev < 15) {
    score -= 20;
    flags.push('Highly regular typing (potential scripted assistance).');
  }

  // Analysis of intervals (time between keystrokes)
  const intervals = [];
  for (let i = 1; i < keystrokes.length; i++) {
    intervals.push(keystrokes[i].down - keystrokes[i-1].up);
  }
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const intervalVariance = intervals.reduce((a, b) => a + Math.pow(b - avgInterval, 2), 0) / intervals.length;
  const intervalStdDev = Math.sqrt(intervalVariance);

  if (intervalStdDev < 10) {
    score -= 30;
    flags.push('Suspiciously uniform pauses between keys.');
  }

  return {
    score: Math.max(0, score),
    averageDwellTime: avgDwell.toFixed(2) + 'ms',
    consistencyMetric: stdDev.toFixed(2),
    flags
  };
};

module.exports = { analyzeKeystrokes };
