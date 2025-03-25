import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EmailVerification = ({ userId }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/verify-email', { userId, otp });
      
      if (response.status === 200) {
        // Redirect to login page after successful verification
        history.push('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while verifying email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-verification-container">
      <h2>Verify Your Email</h2>
      <p>Please enter the verification code sent to your email address.</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">Verification Code</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-control"
            placeholder="Enter 6-digit code"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
