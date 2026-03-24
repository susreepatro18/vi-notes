import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${isLogin ? 'Login' : 'Register'} successful (Mock)`);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Welcome Back' : 'Join Vi-Notes'}</h2>
        <p>{isLogin ? 'Sign in to continue your writing session' : 'Create an account to track your writing authenticity'}</p>
        
        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" className="auth-button">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
        
        <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
