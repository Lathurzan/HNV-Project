import React, { useState, useEffect } from 'react';
import { Plus, X, Check, AlertCircle, Star, Eye, EyeOff, Trash2 } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    position: '',
    image: '',
    rating: 5,
    quote: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hiddenTestimonials, setHiddenTestimonials] = useState([]);

  const API_URL = process.env.NODE_ENV === 'production'
    ? '/api/testimonials'
    : 'http://localhost:5000/api/testimonials';

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      showAlert('Could not load testimonials.', 'error');
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
  };

  const handleSaveNew = async () => {
    if (!newTestimonial.name || !newTestimonial.quote) {
      showAlert('Please fill all required fields.', 'error');
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      if (!res.ok) throw new Error('Failed to add testimonial');
      showAlert('Testimonial added successfully.', 'success');
      setIsAdding(false);
      setNewTestimonial({ name: '', position: '', image: '', rating: 5, quote: '' });
      fetchTestimonials();
    } catch (err) {
      showAlert('Failed to add testimonial.', 'error');
    }
  };

  const handleHide = async (id) => {
    try {
      await fetch(`${API_URL}/toggle/${id}`, { method: 'PATCH' });
      showAlert('Testimonial hidden.', 'success');
      fetchTestimonials();
    } catch {
      showAlert('Failed to hide testimonial.', 'error');
    }
  };

  const handleUnhide = async (id) => {
    try {
      await fetch(`${API_URL}/toggle/${id}`, { method: 'PATCH' });
      showAlert('Testimonial unhidden.', 'success');
      fetchTestimonials();
    } catch {
      showAlert('Failed to unhide testimonial.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      showAlert('Testimonial deleted successfully.', 'success');
      fetchTestimonials();
    } catch {
      showAlert('Failed to delete testimonial.', 'error');
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

  const renderStarRating = (rating, editable = false, setRating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => editable && setRating && setRating(star)}
            className={`${editable ? 'cursor-pointer' : 'cursor-default'} focus:outline-none`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage client testimonials</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Testimonial
        </button>
      </div>
      {/* Alert Message */}
      {alertMessage && (
        <div className={`mb-6 p-4 rounded-md ${
          alertType === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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
      {/* Add New Form */}
      {isAdding && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Testimonial</h2>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Position</label>
              <input
                type="text"
                value={newTestimonial.position}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, position: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
              <input
                type="text"
                value={newTestimonial.image}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              {renderStarRating(newTestimonial.rating, true, (rating) =>
                setNewTestimonial({ ...newTestimonial, rating })
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Testimonial</label>
              <textarea
                rows={4}
                value={newTestimonial.quote}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md mr-2 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNew}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Add Testimonial
            </button>
          </div>
        </div>
      )}
      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => {
          const isHidden = testimonial.hidden;
          return (
            <div key={testimonial._id} className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${isHidden ? 'opacity-50' : ''}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image || 'https://via.placeholder.com/100'}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {isHidden ? (
                      <button
                        onClick={() => handleUnhide(testimonial._id)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 flex items-center"
                        title="Unhide"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleHide(testimonial._id)}
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                        title="Hide"
                      >
                        <EyeOff className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  {renderStarRating(testimonial.rating)}
                </div>
                <blockquote className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
