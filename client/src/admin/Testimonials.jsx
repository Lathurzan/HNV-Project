import React from 'react';
import { useState } from 'react';
import { Edit, Trash, Plus, X, Check, AlertCircle, Star } from 'lucide-react';

const initialTestimonials = [
  {
    id: 1,
    name: "John Smith",
    position: "Homeowner",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    quote: "HNV Building transformed our outdated kitchen into a modern masterpiece. Their attention to detail and quality of work was exceptional. Highly recommended!"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Property Developer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    quote: "We've worked with HNV on multiple development projects, and they consistently deliver quality results on time and within budget. A truly professional team."
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "Business Owner",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4,
    quote: "The team at HNV Building handled our office renovation brilliantly. They worked around our business hours to minimize disruption and completed the project ahead of schedule."
  },
  {
    id: 4,
    name: "Emma Wilson",
    position: "Homeowner",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    quote: "From the initial consultation to the final touches, HNV provided exceptional service for our bathroom renovation. Their craftsmanship is unmatched!"
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
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

  const handleEdit = (testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    showAlert('Testimonial deleted successfully.', 'success');
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingTestimonial(null);
    setNewTestimonial({
      name: '',
      position: '',
      image: '',
      rating: 5,
      quote: ''
    });
  };

  const handleSaveEdit = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === editingTestimonial.id ? editingTestimonial : testimonial
      ));
      setEditingTestimonial(null);
      showAlert('Testimonial updated successfully.', 'success');
    }
  };

  const handleSaveNew = () => {
    if (!newTestimonial.name || !newTestimonial.quote) {
      showAlert('Please fill all required fields.', 'error');
      return;
    }
    
    const newId = Math.max(...testimonials.map(t => t.id), 0) + 1;
    const testimonialToAdd = {
      ...newTestimonial,
      id: newId
    };
    
    setTestimonials([...testimonials, testimonialToAdd]);
    setIsAdding(false);
    showAlert('Testimonial added successfully.', 'success');
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
      
      {/* Edit Form */}
      {editingTestimonial && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Testimonial</h2>
            <button 
              onClick={() => setEditingTestimonial(null)}
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
                value={editingTestimonial.name} 
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Position</label>
              <input 
                type="text" 
                value={editingTestimonial.position} 
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, position: e.target.value })} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
              <input 
                type="text" 
                value={editingTestimonial.image} 
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, image: e.target.value })} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              {renderStarRating(editingTestimonial.rating, true, (rating) => 
                setEditingTestimonial({ ...editingTestimonial, rating })
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Testimonial</label>
              <textarea 
                rows={4} 
                value={editingTestimonial.quote} 
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setEditingTestimonial(null)}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md mr-2 transition-colors duration-300"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveEdit}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Save Changes
            </button>
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
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
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
                  <button 
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <Trash className="h-5 w-5" />
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
        ))}
        </div>
    </div>
  );
};

export default Testimonials;
