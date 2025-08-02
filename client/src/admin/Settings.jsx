import React, { useState } from 'react';
import axios from 'axios';
import { Save, Lock, LoaderCircle, AlertCircle, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // Remove type annotation
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({ username: '', oldPassword: '', newPassword: '' });
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 3000);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation for social URLs before sending to backend
    const isValidSocialUrl = (url, domain) => {
      if (!url) return true;
      try {
        const parsed = new URL(url);
        return (
          parsed.protocol === 'https:' &&
          (parsed.hostname === domain || parsed.hostname === `www.${domain}`)
        );
      } catch {
        return false;
      }
    };
    if (!isValidSocialUrl(settings.facebookUrl, 'facebook.com')) {
      showAlert('Facebook URL is invalid. Please enter a valid Facebook profile or page URL.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!isValidSocialUrl(settings.instagramUrl, 'instagram.com')) {
      showAlert('Instagram URL is invalid. Please enter a valid Instagram profile URL.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!isValidSocialUrl(settings.twitterUrl, 'twitter.com')) {
      showAlert('Twitter URL is invalid. Please enter a valid Twitter profile URL.', 'error');
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post('https://hnv-project.onrender.com/api/settings', settings);
      showAlert(res.data.message, 'success');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Unable to save settings';
      // Only log to console, do not show to user
      console.error('Settings save error:', errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setLoadingPassword(true);
    try {
      const res = await axios.post('https://hnv-project.onrender.com/api/admin/change-password', formData);
      showAlert(res.data.message, 'success');
      setFormData({ username: '', oldPassword: '', newPassword: '' });
      setShowPasswordModal(false); // Close the modal after successful change
    } catch (err) {
      if (err.response?.status === 413) {
        showAlert('Request too large. Please try again with smaller data.', 'error');
      } else {
        const errMsg = err.response?.data?.message || 'Something went wrong';
        showAlert(errMsg, 'error');
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('https://hnv-project.onrender.com/api/settings');
        setSettings(res.data);
      } catch (err) {
        setSettings({}); 
      }
    };
    fetchSettings();
  }, []);

  if (!settings) return null; 

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Admin Settings</h1>
      <p className="text-gray-600 mb-6">Manage website settings and admin password</p>

      {alertMessage && (
        <div
          className={`mb-6 p-4 rounded-md flex items-start gap-2 ${
            alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {alertType === 'success' ? <Check /> : <AlertCircle />}
          <span>{alertMessage}</span>
        </div>
      )}

      <form onSubmit={handleSettingsSubmit} className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings?.siteName || ''}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Site Tagline</label>
            <input
              type="text"
              name="siteTagline"
              value={settings?.siteTagline || ''}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={settings?.email || ''}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={settings?.phone || ''}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={settings?.address || ''}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="url"
              name="facebookUrl"
              value={settings?.facebookUrl || ''}
              onChange={handleSettingsChange}
              placeholder="Facebook URL"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="url"
              name="instagramUrl"
              value={settings?.instagramUrl || ''}
              onChange={handleSettingsChange}
              placeholder="Instagram URL"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="url"
              name="twitterUrl"
              value={settings?.twitterUrl || ''}
              onChange={handleSettingsChange}
              placeholder="Twitter URL"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 border-t">
          <button
            type="submit"
            className={`flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md transition ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Change Password Button */}
      <div className="flex justify-center mt-10">
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition shadow"
          onClick={() => navigate('https://hnv-project.onrender.com/admin/change-password')}
        >
          <Lock size={20} /> Change Admin Password
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
