/**
 * Statistical Analysis Engine for Keystroke Dynamics
 */

const analyzeKeystrokes = (keystrokes) => {
  if (!keystrokes || keystrokes.length < 10) return { score: 100, confidence: 'Low (Insufficient MetaData)' };

  const keyups = keystrokes.filter(k => k.type === 'keyup');
  const keydowns = keystrokes.filter(k => k.type === 'keydown');

  // 1. Dwell Time (Latency between keydown and keyup for the same key)
  // For simplicity, we compare timestamps of adjacent events
  let totalDwell = 0;
  let dwellTimes = [];
  
  for (let i = 0; i < Math.min(keyups.length, keydowns.length); i++) {
    const dwell = keyups[i].pressTime - keydowns[i].pressTime;
    if (dwell > 0 && dwell < 2000) { // Filter out long idle periods
      totalDwell += dwell;
      dwellTimes.push(dwell);
    }
  }

  const avgDwell = totalDwell / dwellTimes.length;
  
  // 2. Consistency Analysis (Standard Deviation of dwell times)
  // Humans have variable rhythms; AI/Scripts have perfect consistency.
  const variance = dwellTimes.reduce((sum, d) => sum + Math.pow(d - avgDwell, 2), 0) / dwellTimes.length;
  const stdDev = Math.sqrt(variance);

  // 3. Authenticity Scoring logic
  // Too consistent (low std dev) = Suspicious
  // Too inconsistent (high std dev) = Natural human variability (up to a point)
  let score = 100;
  let flags = [];

  if (stdDev < 5) {
    score -= 40;
    flags.push('Suspiciously consistent typing rhythm (bot-like)');
  } else if (stdDev < 15) {
    score -= 10;
    flags.push('Slightly robotic rhythm');
  }

  return {
    score: Math.max(0, score),
    averageDwellTime: avgDwell.toFixed(2) + 'ms',
    consistencyMetric: stdDev.toFixed(2),
    flags
  };
};

module.exports = { analyzeKeystrokes };
