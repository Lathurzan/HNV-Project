import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setUsername('');
        setPassword('');
        setTimeout(() => {
          navigate('/admin/login/3gKjd92sfT0q');
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">Admin Register</h2>

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
            placeholder="Username"
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
          <button onClick={handleRegister} className="bubble-button">
            Register
            <span className="bubble top-left"></span>
            <span className="bubble top-right"></span>
            <span className="bubble bottom-left"></span>
            <span className="bubble bottom-right"></span>
            <span className="bubble center-left"></span>
            <span className="bubble center-right"></span>
            <span className="bubble top-center"></span>
            <span className="bubble bottom-center"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
