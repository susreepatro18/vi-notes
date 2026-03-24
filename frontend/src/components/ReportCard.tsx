import React from 'react';

interface ReportProps {
  analysis: {
    score: number;
    averageDwellTime: string;
    consistencyMetric: string;
    flags: string[];
  };
  onClose: () => void;
}

const ReportCard: React.FC<ReportProps> = ({ analysis, onClose }) => {
  const isHealthy = analysis.score > 70;

  return (
    <div className="report-overlay">
      <div className="report-card">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Authenticity Report</h2>
        
        <div className="score-section">
          <div className={`score-circle ${isHealthy ? 'healthy' : 'suspicious'}`}>
            <span className="score-value">{analysis.score}%</span>
            <span className="score-label">Human Confidence</span>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-item">
            <span className="label">Avg. Dwell Time</span>
            <span className="value">{analysis.averageDwellTime}</span>
          </div>
          <div className="metric-item">
            <span className="label">Consistency Metric</span>
            <span className="value">{analysis.consistencyMetric}</span>
          </div>
        </div>

        {analysis.flags.length > 0 && (
          <div className="flags-section">
            <h3>Anomalies Detected</h3>
            <ul>
              {analysis.flags.map((flag, i) => (
                <li key={i}>{flag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
