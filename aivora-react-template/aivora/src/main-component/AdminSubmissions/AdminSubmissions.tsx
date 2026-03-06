import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  getFormSubmissions, 
  updateSubmissionStatus, 
  deleteSubmission,
  getSubmissionStats,
  FormSubmission 
} from '../../services/formSubmissionService';
import './AdminSubmissions.css';

const AdminSubmissions: React.FC = () => {
  const { logout } = useAuth();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [stats, setStats] = useState(getSubmissionStats());
  const [filterStatus, setFilterStatus] = useState<'all' | FormSubmission['status']>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const allSubmissions = getFormSubmissions();
    setSubmissions(allSubmissions);
    setStats(getSubmissionStats());
  };

  const handleStatusChange = (id: string, status: FormSubmission['status']) => {
    updateSubmissionStatus(id, status);
    loadSubmissions();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(id);
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === filterStatus);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: FormSubmission['status']) => {
    switch (status) {
      case 'new': return 'status-badge-new';
      case 'read': return 'status-badge-read';
      case 'contacted': return 'status-badge-contacted';
      default: return '';
    }
  };

  return (
    <div className="admin-submissions-wrapper">
      <div className="admin-submissions-header">
        <div className="admin-header-content">
          <h2>Client Submissions</h2>
          <div className="admin-header-actions">
            <Link to="/admin/dashboard" className="admin-nav-link">
              Dashboard
            </Link>
            <button onClick={logout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-submissions-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
          <div className="stat-card stat-new">
            <div className="stat-value">{stats.new}</div>
            <div className="stat-label">New</div>
          </div>
          <div className="stat-card stat-read">
            <div className="stat-value">{stats.read}</div>
            <div className="stat-label">Read</div>
          </div>
          <div className="stat-card stat-contacted">
            <div className="stat-value">{stats.contacted}</div>
            <div className="stat-label">Contacted</div>
          </div>
        </div>

        {/* Filter and List */}
        <div className="submissions-content">
          <div className="submissions-list">
            <div className="list-header">
              <h3>All Submissions</h3>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="contacted">Contacted</option>
              </select>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="empty-state">
                <p>No submissions found.</p>
              </div>
            ) : (
              <div className="submissions-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr 
                        key={submission.id}
                        className={selectedSubmission?.id === submission.id ? 'selected' : ''}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <td>{submission.name}</td>
                        <td>{submission.email}</td>
                        <td>{submission.phone}</td>
                        <td>{submission.service}</td>
                        <td>{formatDate(submission.submittedAt)}</td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(submission.status)}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(submission.id);
                            }}
                            className="delete-btn"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selectedSubmission && (
            <div className="submission-detail">
              <div className="detail-header">
                <h3>Submission Details</h3>
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <label>Name:</label>
                  <p>{selectedSubmission.name}</p>
                </div>

                <div className="detail-section">
                  <label>Email:</label>
                  <p>
                    <a href={`mailto:${selectedSubmission.email}`}>
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>

                <div className="detail-section">
                  <label>Phone:</label>
                  <p>
                    <a href={`tel:${selectedSubmission.phone}`}>
                      {selectedSubmission.phone}
                    </a>
                  </p>
                </div>

                <div className="detail-section">
                  <label>Service:</label>
                  <p>{selectedSubmission.service}</p>
                </div>

                <div className="detail-section">
                  <label>Message:</label>
                  <p className="message-text">{selectedSubmission.message}</p>
                </div>

                {selectedSubmission.fileName && (
                  <div className="detail-section">
                    <label>Attached File:</label>
                    <p>{selectedSubmission.fileName}</p>
                  </div>
                )}

                <div className="detail-section">
                  <label>Submitted:</label>
                  <p>{formatDate(selectedSubmission.submittedAt)}</p>
                </div>

                <div className="detail-section">
                  <label>Status:</label>
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as FormSubmission['status'])}
                    className="status-select"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="contacted">Contacted</option>
                  </select>
                </div>

                <div className="detail-actions">
                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="delete-detail-btn"
                  >
                    Delete Submission
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;
