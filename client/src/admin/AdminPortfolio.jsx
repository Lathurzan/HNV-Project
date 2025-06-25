import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import axios from 'axios';

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    image: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        setAlert('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    if (!newProject.title || !newProject.category || !newProject.image) return;
    if (editIndex !== null) {
      // Update project in backend
      const project = projects[editIndex];
      try {
        await axios.put(`/api/projects/${project._id}`, newProject);
        const updated = [...projects];
        updated[editIndex] = { ...newProject, _id: project._id };
        setProjects(updated);
        setEditIndex(null);
        setNewProject({ title: '', category: '', image: '' });
        setAlert('Project updated successfully');
      } catch (err) {
        setAlert('Failed to update project');
      }
    } else {
      try {
        const res = await axios.post('/api/projects', newProject);
        setProjects([...projects, { ...newProject, _id: res.data.projectId }]);
        setNewProject({ title: '', category: '', image: '' });
        setAlert('Project added successfully');
      } catch (err) {
        setAlert('Failed to add project');
      }
    }
  };

  const handleEdit = (index) => {
    setNewProject(projects[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const project = projects[index];
    if (!project || !project._id) return;
    try {
      await axios.delete(`/api/projects/${project._id}`);
      setProjects(projects.filter((_, i) => i !== index));
      setAlert('Project deleted successfully');
    } catch (err) {
      setAlert('Failed to delete project');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Manage Portfolio</h2>

      {alert && (
        <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800">
          {alert}
        </div>
      )}

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
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setNewProject(prev => ({ ...prev, image: reader.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full"
          />
          {/* Preview selected image */}
          {newProject.image && (
            <img
              src={newProject.image}
              alt="Preview"
              className="w-24 h-16 object-cover rounded mt-2 border"
            />
          )}
        </div>
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
