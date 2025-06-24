import React, { useState } from 'react';
import axios from 'axios';
import { Save, Lock, LoaderCircle, AlertCircle, Check, X } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'HNV Building',
    siteTagline: 'Building Excellence',
    email: 'info@hnvbuilding.com',
    phone: '+44 (0) 1234 567890',
    address: '123 Construction Road, Building City, BC12 3DE',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com',
  });

  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // Remove type annotation
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showAlert('Settings saved successfully!', 'success');
    }, 1000);
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
      const res = await axios.post('/api/admin/change-password', formData);
      showAlert(res.data.message, 'success');
      setFormData({ username: '', oldPassword: '', newPassword: '' });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Something went wrong';
      showAlert(errMsg, 'error');
    } finally {
      setLoadingPassword(false);
    }
  };

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
              value={settings.siteName}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Site Tagline</label>
            <input
              type="text"
              name="siteTagline"
              value={settings.siteTagline}
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
                value={settings.email}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
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
              value={settings.facebookUrl}
              onChange={handleSettingsChange}
              placeholder="Facebook URL"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="url"
              name="instagramUrl"
              value={settings.instagramUrl}
              onChange={handleSettingsChange}
              placeholder="Instagram URL"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="url"
              name="twitterUrl"
              value={settings.twitterUrl}
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
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition shadow"
          onClick={() => setShowPasswordModal(true)}
        >
          <Lock size={20} /> Change Admin Password
        </button>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowPasswordModal(false)}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock size={20} /> Change Admin Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Admin Username"
                value={formData.username}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={formData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
                disabled={loadingPassword}
              >
                {loadingPassword ? (
                  <>
                    <LoaderCircle className="animate-spin" size={18} /> Changing...
                  </>
                ) : (
                  'Change Password'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
