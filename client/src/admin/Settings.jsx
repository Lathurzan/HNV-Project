import React, { useState } from 'react';
import { Save, AlertCircle, Check } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'HNV Building',
    siteTagline: 'Building Excellence',
    email: 'info@hnvbuilding.com',
    phone: '+44 (0) 1234 567890',
    address: '123 Construction Road, Building City, BC12 3DE',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // no explicit union type in JS

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setIsSubmitting(false);
      showAlert('Settings saved successfully!', 'success');
    }, 1000);
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your website settings</p>
      </div>
      
      {/* Alert Message */}
      {alertMessage && (
        <div className={`mb-6 p-4 rounded-md ${
          alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-start">
            {alertType === 'success' ? (
              <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            )}
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Site Name</label>
              <input 
                type="text" 
                name="siteName"
                value={settings.siteName} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Site Tagline</label>
              <input 
                type="text" 
                name="siteTagline"
                value={settings.siteTagline} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={settings.email} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input 
                  type="text" 
                  name="phone"
                  value={settings.phone} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={settings.address} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Facebook URL</label>
                <input 
                  type="url" 
                  name="facebookUrl"
                  value={settings.facebookUrl} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Instagram URL</label>
                <input 
                  type="url" 
                  name="instagramUrl"
                  value={settings.instagramUrl} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Twitter URL</label>
                <input 
                  type="url" 
                  name="twitterUrl"
                  value={settings.twitterUrl} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className={`flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md transition-colors duration-300 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              <Save className="h-5 w-5 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
