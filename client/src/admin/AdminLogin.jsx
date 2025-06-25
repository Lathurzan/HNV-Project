import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // TODO: Replace with your actual client ID
const ADMIN_EMAIL = 'admin@example.com'; // TODO: Replace with your allowed admin email

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const googleDivRef = useRef(null);

  // Handle Google login callback
  const handleGoogleCallback = async (response) => {
    try {
      // Send credential to backend for verification
      const res = await fetch('http://localhost:5000/api/admin/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });
      const data = await res.json();
      if (res.ok && data.auth && data.email === ADMIN_EMAIL) {
        localStorage.setItem('admin-auth', 'true');
        navigate('/admin');
      } else {
        setError(data.message || 'You are not authorized to access this panel');
      }
    } catch (err) {
      setError('Google login failed. Try again.');
    }
  };

  // Load Google script and render button
  useEffect(() => {
    // Load script if not present
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && googleDivRef.current) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
          });
          window.google.accounts.id.renderButton(googleDivRef.current, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.google && googleDivRef.current) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(googleDivRef.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      });
    }
  }, []);

  // Handle classic login
  const handleLogin = async () => {
    setError('');
    setSuccess('');
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    try {
      // If username is an email, handle OTP flow
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
        const res = await fetch('http://localhost:5000/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, otp: showOtp ? otp : undefined }),
        });
        const data = await res.json();
        if (res.ok && data.auth) {
          localStorage.setItem('admin-auth', 'true');
          navigate('/admin');
        } else if (data.message && data.message.includes('OTP')) {
          setShowOtp(true);
          setSuccess(data.message);
        } else {
          setError(data.message || 'Invalid credentials');
        }
      } else {
        // Normal username login
        const response = await fetch('http://localhost:5000/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok && data.auth) {
          localStorage.setItem('admin-auth', 'true');
          navigate('/admin');
        } else {
          setError(data.message || 'Invalid credentials');
        }
      }
    } catch (err) {
      setError('Login failed. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">Admin Login</h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded text-center mb-4 text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 bg-green-100 dark:bg-green-900 p-2 rounded text-center mb-4 text-sm">
            {success}
          </p>
        )}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showOtp && (
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {showOtp ? 'Verify OTP & Login' : 'Login'}
          </button>
          <div className="flex items-center justify-center mt-4">
            <div ref={googleDivRef} id="googleSignInDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
