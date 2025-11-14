import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const data = location.state || JSON.parse(sessionStorage.getItem('lastResult') || 'null') || null;

  // If page was navigated to with data, store it so refresh keeps it
  React.useEffect(() => {
    if (location.state) sessionStorage.setItem('lastResult', JSON.stringify(location.state));
  }, [location.state]);

  if (!data) {
    return (
      <div className="card">
        <h3>No result available</h3>
        <p>Please upload a resume first.</p>
        <Link to="/upload" className="btn">Upload</Link>
      </div>
    );
  }

  const { atsScore, filePath, message } = data;

  return (
    <div className="card">
      <h2>Analysis Result</h2>
      {message && <p className="muted">{message}</p>}
      <div className="result-row">
        <div className="score">ATS Score</div>
        <div className="value">{typeof atsScore === 'number' ? atsScore : 'N/A'}</div>
      </div>

      {filePath && (
        <p>
          Uploaded file: <a target="_blank" rel="noreferrer" href={filePath}>{filePath}</a>
        </p>
      )}

      <div className="actions">
        <Link to="/upload" className="btn">Upload another</Link>
        <Link to="/dashboard" className="btn-outline">Back to dashboard</Link>
      </div>
    </div>
  );
};

export default Result;
