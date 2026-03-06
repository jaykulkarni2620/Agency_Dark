import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load the admin dashboard HTML
    if (iframeRef.current) {
      // Set the iframe source to the admin dashboard
      // We'll copy the admin dashboard files to public folder
      iframeRef.current.src = '/admin-dashboard/index.html';
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-dashboard-header">
        <div className="admin-header-content">
          <h2>Minex Admin Dashboard</h2>
          <div className="admin-header-actions">
            <Link to="/admin/submissions" className="admin-nav-link">
              View Submissions
            </Link>
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className="admin-dashboard-iframe"
        title="Admin Dashboard"
        frameBorder="0"
      />
    </div>
  );
};

export default AdminDashboard;
