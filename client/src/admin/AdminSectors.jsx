import React, { useState } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

const AdminSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [newSector, setNewSector] = useState({ title: '', desc: '', img: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewSector({ ...newSector, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newSector.title || !newSector.desc || !newSector.img) return;
    if (editIndex !== null) {
      const updated = [...sectors];
      updated[editIndex] = newSector;
      setSectors(updated);
      setEditIndex(null);
    } else {
      setSectors([...sectors, newSector]);
    }
    setNewSector({ title: '', desc: '', img: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewSector(sectors[index]);
  };

  const handleDelete = (index) => {
    const updated = sectors.filter((_, i) => i !== index);
    setSectors(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Manage Market Sectors</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          name="title"
          placeholder="Sector Title"
          value={newSector.title}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          name="desc"
          placeholder="Short Description"
          value={newSector.desc}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          name="img"
          placeholder="Image URL"
          value={newSector.img}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow transition-all duration-200"
      >
        <PlusCircle className="w-4 h-4" />
        {editIndex !== null ? 'Update Sector' : 'Add Sector'}
      </button>

      {/* Sector cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {sectors.map((sector, index) => (
          <div key={index} className="border dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 p-4">
            <img
              src={sector.img}
              alt={sector.title}
              className="w-full h-40 object-cover rounded mb-3"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{sector.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{sector.desc}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(index)}
                className="text-yellow-600 hover:text-yellow-700 dark:hover:text-yellow-400 flex items-center gap-1 text-sm"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSectors;
