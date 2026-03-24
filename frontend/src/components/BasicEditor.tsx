import React, { useState, useRef, useCallback } from 'react';
import { 
  ShieldCheck, Activity, Clock, ShieldAlert, 
  Trash2, Play, Download, Monitor 
} from 'lucide-react';
import type { LogEvent, WritingStats } from '../types/index';
import { calculateAuthenticityScore } from '../utils/analysisEngine';
import { generateAuthorshipPDF } from '../utils/pdfGenerator';

const BasicEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [confidence, setConfidence] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const statsRef = useRef<WritingStats>({
    lastKeyTime: null,
    intervals: [],
    pauseCount: 0,
    deletionCount: 0,
    pasteCount: 0,
    pastedCharCount: 0,
  });

  const addLog = useCallback((type: LogEvent['type'], message: string) => {
    const newLog: LogEvent = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 10));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const now = Date.now();
    const stats = statsRef.current;

    if (e.key === 'Backspace' || e.key === 'Delete') {
      stats.deletionCount++;
      addLog('deletion', 'Modification detected.');
    }

    if (stats.lastKeyTime) {
      const diff = now - stats.lastKeyTime;
      stats.intervals.push(diff);
      if (diff > 2500) {
        stats.pauseCount++;
        addLog('timing', `Pause: ${(diff/1000).toFixed(1)}s`);
      }
    }
    stats.lastKeyTime = now;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const stats = statsRef.current;
    const pastedText = e.clipboardData.getData('text');
    stats.pasteCount++;
    stats.pastedCharCount += pastedText.length;
    addLog('paste', `Pasted ${pastedText.length} characters.`);
    
    const newConfidence = calculateAuthenticityScore(statsRef.current, confidence);
    setConfidence(newConfidence);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const newConfidence = calculateAuthenticityScore(statsRef.current, confidence);
    setConfidence(newConfidence);
  };

  const resetSession = () => {
    statsRef.current = {
      lastKeyTime: null,
      intervals: [],
      pauseCount: 0,
      deletionCount: 0,
      pasteCount: 0,
      pastedCharCount: 0,
    };
    setText('');
    setConfidence(100);
    setLogs([]);
    addLog('system', 'Behavior analysis restarted.');
  };

  const handleExport = async () => {
    setIsGenerating(true);
    await generateAuthorshipPDF(
      statsRef.current, 
      logs, 
      confidence, 
      text.trim().split(/\s+/).length
    );
    setIsGenerating(false);
  };

  return (
    <div className="writing-lab-layout">
      <div className="editor-main-section">
        <div className="editor-card">
          <div className="editor-card-header">
            <div className="header-title">
              <Monitor size={18} />
              <h2>Writing Workspace</h2>
            </div>
            <button onClick={resetSession} className="icon-btn" title="Reset Session">
              <Trash2 size={18} />
            </button>
          </div>
          
          <textarea
            ref={textAreaRef}
            className="writing-area"
            placeholder="Start typing your content here. Our behavioral engine analyzes rhythmic variance, cognitive pauses, and revision patterns to verify human authorship."
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
          
          <div className="editor-card-footer">
            <div className="session-stats">
              <span><b>{text.trim() ? text.trim().split(/\s+/).length : 0}</b> Words</span>
              <span><b>{statsRef.current.intervals.length}</b> Data Points</span>
            </div>
            <div className="editor-actions">
              <button className="btn-secondary" onClick={() => addLog('system', 'Manual analysis triggered.')}>
                <Play size={16} /> Analyze
              </button>
              <button className="btn-primary" onClick={handleExport} disabled={isGenerating}>
                <Download size={16} /> {isGenerating ? 'Generating...' : 'Get Certificate'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside className="writing-lab-sidebar">
        <div className="status-card">
          <div className="card-header">
            <ShieldCheck size={20} color="#4ade80" />
            <h3>Authorship Status</h3>
          </div>
          <div className="confidence-display">
            <div className="score-info">
              <span>Human Confidence</span>
              <span className={`score ${confidence > 70 ? 'pass' : 'fail'}`}>{confidence}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${confidence}%`, background: confidence > 70 ? '#4ade80' : '#f87171' }}
              />
            </div>
          </div>
          <p className="card-note">
            Verifying behavioral entropy and rhythmic consistency.
          </p>
        </div>

        <div className="logs-card">
          <div className="card-header">
            <Clock size={20} />
            <h3>Behavioral Logs</h3>
          </div>
          <div className="logs-content">
            {logs.length === 0 ? (
              <div className="no-logs">Waiting for interaction...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="log-entry">
                  <div className="log-meta">
                    <span className={`log-type ${log.type}`}>
                      {log.type === 'paste' ? <ShieldAlert size={12} /> : <Activity size={12} />}
                      {log.type}
                    </span>
                    <span className="log-time">{log.timestamp}</span>
                  </div>
                  <div className="log-msg">{log.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BasicEditor;
