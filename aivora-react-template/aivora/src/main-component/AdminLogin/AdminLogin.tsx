import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>Minex Admin</h1>
          <p>Sign in to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}
          
          <div className="admin-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@minex.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Default credentials:</p>
          <p><strong>Email:</strong> admin@minex.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
