import React, { useState } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

const initialProjects = [
  {
    title: "Modern Home Renovation",
    category: "Home / Renovation",
    image: "http://hnvbuilding.co.uk/wp/wp-content/uploads/2020/08/WhatsApp-Image-2024-04-17-at-12.41.00-PM.jpeg",
  },
  {
    title: "Garden Landscaping Design",
    category: "Garden / Landscaping",
    image: "http://hnvbuilding.co.uk/wp/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-17-at-12.40.35-PM.jpeg",
  },
  {
    title: "Luxury Kitchen Installation",
    category: "Interior / Kitchen",
    image: "http://hnvbuilding.co.uk/wp/wp-content/uploads/2020/08/WhatsApp-Image-2024-04-17-at-12.41.01-PM-1.jpeg",
  },
];

const AdminPortfolio = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    image: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!newProject.title || !newProject.category || !newProject.image) return;

    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = newProject;
      setProjects(updated);
      setEditIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }

    setNewProject({ title: '', category: '', image: '' });
  };

  const handleEdit = (index) => {
    setNewProject(projects[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Manage Portfolio</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={newProject.title}
          onChange={handleInputChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProject.category}
          onChange={handleInputChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProject.image}
          onChange={handleInputChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      <button
        onClick={handleAddOrUpdate}
        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded mb-6"
      >
        <PlusCircle className="w-4 h-4" />
        {editIndex !== null ? 'Update Project' : 'Add Project'}
      </button>

      {/* Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-300 dark:border-gray-700 rounded shadow-sm p-4 bg-white dark:bg-gray-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded mb-3"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{project.category}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(index)}
                className="text-yellow-600 hover:text-yellow-700 dark:hover:text-yellow-400 flex items-center gap-1 text-sm"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 text-sm"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortfolio;
