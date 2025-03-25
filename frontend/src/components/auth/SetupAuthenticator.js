import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import jwt_decode from 'jwt-decode';

const SetupAuthenticator = () => {
  const [secret, setSecret] = useState('');
  const [otpauthUrl, setOtpauthUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(true);

  useEffect(() => {
    // Fetch 2FA setup data when component mounts
    const initSetup = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          '/api/auth/setup-2fa-authenticator', 
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        setSecret(response.data.secret);
        setOtpauthUrl(response.data.otpauth_url);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to initialize 2FA setup');
      } finally {
        setSetupLoading(false);
      }
    };

    initSetup();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/auth/verify-2fa-authenticator',
        {
          token: verificationCode
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.status === 200) {
        setSuccess('Two-factor authentication has been successfully enabled!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify authenticator code');
    } finally {
      setLoading(false);
    }
  };

  if (setupLoading) {
    return <div>Loading 2FA setup...</div>;
  }

  return (
    <div className="setup-authenticator-container">
      <h2>Set Up Two-Factor Authentication</h2>
      <p>Scan this QR code with your authenticator app or enter the key manually.</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="qrcode-container">
        {otpauthUrl && <QRCode value={otpauthUrl} size={200} />}
      </div>
      
      <div className="secret-key">
        <p>Manual entry key: <strong>{secret}</strong></p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="verificationCode">Verification Code from Authenticator App</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
          {loading ? 'Verifying...' : 'Verify & Enable 2FA'}
        </button>
      </form>
    </div>
  );
};

export default SetupAuthenticator;
