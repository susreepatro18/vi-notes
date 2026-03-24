import React, { useEffect, useState } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import ReportCard from './ReportCard';

interface Session {
  _id: string;
  content: string;
  analysis: any;
  createdAt: string;
}

const Dashboard: React.FC<{ onBack: () => void }> = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/sessions/guest_user')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-view">
      <section className="hero-section">
        <h1>Authorship Reports</h1>
        <p>View your previously generated certificates and authorship analytics.</p>
      </section>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} color="rgba(255,255,255,0.05)" />
          <h3>No Reports Found</h3>
          <p>You haven't generated any authorship certificates yet.</p>
        </div>
      ) : (
        <div className="session-grid">
          {sessions.map((s) => (
            <div key={s._id} className="session-card" onClick={() => setSelectedSession(s)}>
              <div className="card-top">
                <span className="date-badge">{new Date(s.createdAt).toLocaleDateString()}</span>
                <span className={`status-badge ${s.analysis.score > 70 ? 'pass' : 'fail'}`}>
                  {s.analysis.score}% Human
                </span>
              </div>
              <p className="content-preview">{s.content.substring(0, 100)}...</p>
              <div className="card-bottom">
                <span>View Details</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      )}

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
