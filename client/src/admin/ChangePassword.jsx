import React, { useState } from 'react';
import axios from 'axios';
import { LoaderCircle, AlertCircle, Check } from 'lucide-react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setLoading(true);
    try {
      const res = await axios.post('https://hnv-project.onrender.com/api/admin/change-password', formData);
      showAlert(res.data.message, 'success');
      setFormData({ username: '', oldPassword: '', newPassword: '' });
    } catch (err) {
      if (err.response?.status === 413) {
        showAlert('Request too large. Please try again with smaller data.', 'error');
      } else {
        const errMsg = err.response?.data?.message || 'Something went wrong';
        showAlert(errMsg, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Change Admin Password</h1>
      {alertMessage && (
        <div className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
          alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {alertType === 'success' ? <Check /> : <AlertCircle />}
          <span>{alertMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Admin Username</label>
        <input
          type="text"
          name="username"
          placeholder="Admin Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <label className="block text-sm font-medium text-gray-700">Old Password</label>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={18} /> Changing...
            </>
          ) : (
            'Change Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
