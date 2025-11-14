import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="card">
      <h2>Welcome to ResumeChecker</h2>
      <p>Upload your resume to get an ATS score and suggestions.</p>
      <div className="actions">
        <Link to="/upload" className="btn">Upload Resume</Link>
        <Link to="/result" className="btn-outline">Last Result</Link>
      </div>
    </div>
  );
};

export default Dashboard;
