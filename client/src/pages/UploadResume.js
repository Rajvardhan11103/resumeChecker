import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resume } from '../services/api';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setError('Please select a file');
    setLoading(true);
    setError('');

    const form = new FormData();
    form.append('resume', file);

    try {
      const res = await resume.upload(form);
      // pass result to result page (via state)
      navigate('/result', { state: res.data });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Upload Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload & Analyze'}</button>
      </form>
    </div>
  );
};

export default UploadResume;
