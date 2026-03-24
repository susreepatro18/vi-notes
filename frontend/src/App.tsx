import { useState } from 'react'
import './App.css'
import BasicEditor from './components/BasicEditor'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [view, setView] = useState<'editor' | 'dashboard'>('editor')

  return (
    <div className="app-main">
      <header>
        <div className="logo-section">
          <h1>Vi-Notes</h1>
          <p className="subtitle">Authenticity verification via keystroke dynamics</p>
        </div>
        
        {isAuthenticated && (
          <nav className="main-nav">
            <button 
              className={view === 'editor' ? 'active' : ''} 
              onClick={() => setView('editor')}
            >
              Write
            </button>
            <button 
              className={view === 'dashboard' ? 'active' : ''} 
              onClick={() => setView('dashboard')}
            >
              History
            </button>
          </nav>
        )}
      </header>

      <main>
        {!isAuthenticated ? (
          <div className="auth-wrapper">
            <Auth />
            <button 
              className="skip-auth" 
              onClick={() => setIsAuthenticated(true)}
              style={{
                marginTop: '1rem',
                background: 'transparent',
                border: 'none',
                color: '#444',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Skip to Editor (Demo Mode)
            </button>
          </div>
        ) : (
          <>
            {view === 'editor' ? <BasicEditor /> : <Dashboard onBack={() => setView('editor')} />}
          </>
        )}
      </main>
    </div>
  )
}

export default App
