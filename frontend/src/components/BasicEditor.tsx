import React, { useState, useRef } from 'react';

interface KeystrokeData {
  down: number;
  up?: number;
}

interface PasteEvent {
  timestamp: number;
  textLength: number;
}

const BasicEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [keystrokes, setKeystrokes] = useState<KeystrokeData[]>([]);
  const [pastes, setPastes] = useState<PasteEvent[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  // Track currently pressed keys by their code to match up events
  const activeKeys = useRef<Record<string, number>>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (activeKeys.current[e.code]) return; // Avoid repeat events
    
    const startTime = performance.now();
    activeKeys.current[e.code] = keystrokes.length;
    
    setKeystrokes((prev) => [...prev, { down: startTime }]);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const sessionIndex = activeKeys.current[e.code];
    if (sessionIndex !== undefined) {
      const endTime = performance.now();
      setKeystrokes((prev) => {
        const next = [...prev];
        if (next[sessionIndex]) {
          next[sessionIndex] = { ...next[sessionIndex], up: endTime };
        }
        return next;
      });
      delete activeKeys.current[e.code];
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const data: PasteEvent = {
      timestamp: performance.now(),
      textLength: pastedText.length,
    };
    setPastes((prev) => [...prev, data]);
  };

  const saveSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'guest_user', // Placeholder
          content: text,
          keystrokes: keystrokes,
          pastes: pastes
        }),
      });
      if (response.ok) {
        alert('Session saved successfully!');
      } else {
        alert('Failed to save session');
      }
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Error connecting to server');
    }
  };

  const getConsistency = () => {
    if (keystrokes.length < 10) return 0;
    
    // Calculate dwell times (down to up)
    const dwellTimes = keystrokes
      .filter(k => k.up !== undefined)
      .map(k => k.up! - k.down);

    if (dwellTimes.length < 5) return 0;

    const avg = dwellTimes.reduce((a, b) => a + b, 0) / dwellTimes.length;
    const variance = dwellTimes.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / dwellTimes.length;
    const stdDev = Math.sqrt(variance);
    
    // Normalize: Human is typically 20-80ms stdDev
    return Math.min(100, (stdDev / 40) * 100); 
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="authenticity-score">
          <div className="meter">
            <div 
              className="fill" 
              style={{ width: `${getConsistency()}%`, background: getConsistency() > 30 ? '#4ade80' : '#f87171' }}
            ></div>
          </div>
          <span>Human Rhythm Index</span>
        </div>
      </div>
      <textarea
        ref={textAreaRef}
        className="writing-area"
        placeholder="Start writing freely..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
      />
      <div className="editor-footer">
        <div className="stats">
          <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
          <span>Keystrokes: {keystrokes.length}</span>
          <span>Pastes: {pastes.length}</span>
        </div>
        <button className="save-button" onClick={saveSession}>
          Save Session
        </button>
      </div>
    </div>
  );
};

export default BasicEditor;
