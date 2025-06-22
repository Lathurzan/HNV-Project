import React from 'react';
import { useState } from 'react';
import { Edit, Trash, Plus, X, Check, AlertCircle } from 'lucide-react';

const initialServices = [
  {
    id: 1,
    title: "Plastering & Rendering",
    description:
      "Enhance your space with flawless plastering and durable rendering. From interiors to exteriors, our craftsmanship stands the test of time.",
    image:
      "https://storage.googleapis.com/a1aa/image/efbf0c15-80c0-4a4f-7785-6bc23367fcd4.jpg",
    active: true,
  },
  {
    id: 2,
    title: "Small work services",
    description:
      "Count on us for reliable small repairs and improvements. From carpentry to home maintenance, we handle tasks efficiently.",
    image:
      "https://storage.googleapis.com/a1aa/image/d6ad48b9-5781-4259-9703-be15577f409e.jpg",
    active: true,
  },
  {
    id: 3,
    title: "Bathroom Fitting",
    description:
      "Transform your bathroom into a modern, functional space with our expert fitting services.",
    image: "https://storage.googleapis.com/a1aa/image/sample-bathroom.jpg",
    active: true,
  },
  {
    id: 4,
    title: "Gardening & Landscaping",
    description:
      "Beautify your outdoors with our professional gardening and landscaping solutions.",
    image: "https://storage.googleapis.com/a1aa/image/sample-garden.jpg",
    active: true,
  },
];

const AdminServicesPage = () => {
  const [services, setServices] = useState(initialServices);
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

  const handleEdit = (service) => {
    setEditingService({ ...service });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
    showAlert('Service deleted successfully.', 'success');
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingService(null);
    setNewService({ title: '', description: '', image: '', active: true });
  };

  const handleSaveEdit = () => {
    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id ? editingService : service
        )
      );
      setEditingService(null);
      showAlert('Service updated successfully.', 'success');
    }
  };

  const handleSaveNew = () => {
    if (!newService.title || !newService.description || !newService.image) {
      showAlert('Please fill all required fields.', 'error');
      return;
    }
    const newId = Math.max(...services.map((s) => s.id), 0) + 1;
    setServices([...services, { ...newService, id: newId }]);
    setIsAdding(false);
    showAlert('Service added successfully.', 'success');
  };

  const handleToggleActive = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
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
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                value={editingService ? editingService.image : newService.image}
                onChange={(e) =>
                  editingService
                    ? setEditingService({ ...editingService, image: e.target.value })
                    : setNewService({ ...newService, image: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
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
