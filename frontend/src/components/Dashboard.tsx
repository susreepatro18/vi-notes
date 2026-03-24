import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';

interface Session {
  _id: string;
  content: string;
  analysis: any;
  createdAt: string;
}

const Dashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/sessions/guest_user')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button className="back-btn" onClick={onBack}>← Back to Editor</button>
        <h2>Your Writing History</h2>
      </div>

      <div className="session-list">
        {sessions.map((s) => (
          <div key={s._id} className="session-item" onClick={() => setSelectedSession(s)}>
            <div className="session-info">
              <span className="date">{new Date(s.createdAt).toLocaleDateString()}</span>
              <p className="preview">{s.content.substring(0, 60)}...</p>
            </div>
            <div className="session-status">
              <span className={`badge ${s.analysis.score > 70 ? 'pass' : 'fail'}`}>
                {s.analysis.score}% Human
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedSession && (
        <ReportCard 
          analysis={selectedSession.analysis} 
          onClose={() => setSelectedSession(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
