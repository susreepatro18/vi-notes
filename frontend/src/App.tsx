import { useState, useEffect } from 'react'
import { 
  Moon, Sun, Bell, Globe 
} from 'lucide-react'
import './index.css'
import BasicEditor from './components/BasicEditor'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [view, setView] = useState<'editor' | 'dashboard'>('editor')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-main">
      <header className="app-header">
        <div className="logo-section" onClick={() => setView('editor')}>
          <div className="logo-icon">VN</div>
          <span className="logo-text">ViNote<b>s</b></span>
        </div>

        <nav className="header-main-nav">
          <span 
            className={`nav-link ${view === 'editor' ? 'active' : ''}`} 
            onClick={() => setView('editor')}
          >
            Writing Lab
          </span>
          <span 
            className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setView('dashboard')}
          >
            My Reports
          </span>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="icon-wrapper">
            <Bell size={20} />
          </div>
          {isAuthenticated ? (
            <div className="user-badge" title="Profile">
              SP
            </div>
          ) : (
            <div className="auth-btns">
              <button className="btn-sm btn-outline" onClick={() => setIsAuthenticated(true)}>Log in</button>
              <button className="btn-sm btn-primary" onClick={() => setIsAuthenticated(true)}>Sign up</button>
            </div>
          )}
        </div>
      </header>

      <main className="main-wrapper">
        {!isAuthenticated ? (
          <div className="auth-centered-wrapper">
            <Auth />
            <button className="skip-btn" onClick={() => setIsAuthenticated(true)}>
              Demo Mode
            </button>
          </div>
        ) : (
          <>
            {view === 'editor' ? <BasicEditor /> : <Dashboard onBack={() => setView('editor')} />}
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-branding">
            <div className="footer-brand-logo">ViNote<b>s</b></div>
            <span className="footer-copyright">© 2024 Vi-Notes, Inc.</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="language-selector">
            <Globe size={18} />
            <span>English</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
