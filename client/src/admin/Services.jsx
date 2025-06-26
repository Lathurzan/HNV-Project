import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus, X, Check, AlertCircle } from 'lucide-react';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: '',
    active: true,
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (res.ok) setServices(data);
      else showAlert('Failed to fetch services.', 'error');
    } catch {
      showAlert('Failed to fetch services.', 'error');
    }
  };

  const handleEdit = (service) => {
    setEditingService({ ...service });
    setIsAdding(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter((service) => service._id !== id));
        showAlert('Service deleted successfully.', 'success');
      } else {
        showAlert('Failed to delete service.', 'error');
      }
    } catch {
      showAlert('Failed to delete service.', 'error');
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingService(null);
    setNewService({ title: '', description: '', image: '', active: true });
  };

  const handleSaveEdit = async () => {
    if (editingService) {
      try {
        const res = await fetch(`/api/services/${editingService._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingService),
        });
        if (res.ok) {
          await fetchServices();
          setEditingService(null);
          showAlert('Service updated successfully.', 'success');
        } else {
          showAlert('Failed to update service.', 'error');
        }
      } catch {
        showAlert('Failed to update service.', 'error');
      }
    }
  };

  const handleSaveNew = async () => {
    if (!newService.title || !newService.description || !newService.image) {
      showAlert('Please fill all required fields.', 'error');
      return;
    }
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      if (response.ok) {
        setServices([...services, data.service]);
        setIsAdding(false);
        showAlert('Service added successfully.', 'success');
      } else {
        showAlert(data.message || 'Failed to add service.', 'error');
      }
    } catch (error) {
      showAlert('Failed to add service.', 'error');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await fetch(`/api/services/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        await fetchServices();
      } else {
        showAlert('Failed to toggle status.', 'error');
      }
    } catch {
      showAlert('Failed to toggle status.', 'error');
    }
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
    <div className="max-w-6xl mx-auto px-4 py-10 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Services Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your displayed services on the user page.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Service
        </button>
      </div>

      {alertMessage && (
        <div
          className={`mb-6 p-4 rounded-md ${
            alertType === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
          }`}
        >
          <div className="flex items-start">
            {alertType === 'success' ? (
              <Check className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <span>{alertMessage}</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      {(editingService || isAdding) && (
        <div className="mb-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <button
              onClick={() => {
                setEditingService(null);
                setIsAdding(false);
              }}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={editingService ? editingService.title : newService.title}
                onChange={(e) =>
                  editingService
                    ? setEditingService({ ...editingService, title: e.target.value })
                    : setNewService({ ...newService, title: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      if (editingService) {
                        setEditingService({ ...editingService, image: reader.result });
                      } else {
                        setNewService({ ...newService, image: reader.result });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full border px-4 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              {/* Show preview if image is selected */}
              <div className="mt-2">
                <img
                  src={editingService ? editingService.image : newService.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                  style={{ display: (editingService ? editingService.image : newService.image) ? 'block' : 'none' }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Description</label>
              <textarea
                rows={4}
                value={editingService ? editingService.description : newService.description}
                onChange={(e) =>
                  editingService
                    ? setEditingService({ ...editingService, description: e.target.value })
                    : setNewService({ ...newService, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              ></textarea>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingService ? editingService.active : newService.active}
                  onChange={() =>
                    editingService
                      ? setEditingService({ ...editingService, active: !editingService.active })
                      : setNewService({ ...newService, active: !newService.active })
                  }
                  className="mr-2"
                />
                Active
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                setEditingService(null);
                setIsAdding(false);
              }}
              className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-md mr-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={editingService ? handleSaveEdit : handleSaveNew}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
            >
              {editingService ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </div>
      )}

      {/* Service Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  {service.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-sm truncate">
                  {service.description}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleActive(service.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.active
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {service.active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 mr-3"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServicesPage;
