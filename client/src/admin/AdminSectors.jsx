import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

const AdminSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [newSector, setNewSector] = useState({ title: '', desc: '', img: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await fetch('https://hnv-project.onrender.com/api/sectors');
        const data = await res.json();
        if (res.ok) {
          setSectors(data);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchSectors();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'img' && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new window.FileReader();
      reader.onloadend = () => {
        setNewSector({ ...newSector, img: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setNewSector({ ...newSector, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setSuccess("");
    setError("");
    if (!newSector.title || !newSector.desc || !newSector.img) return;
    if (editIndex !== null) {
      // Update sector in backend
      try {
        const sectorId = sectors[editIndex]._id;
        const res = await fetch(`https://hnv-project.onrender.com/api/sectors/${sectorId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSector),
        });
        if (res.status === 413) {
          alert("Image or data too large. Please upload a smaller image.");
          // Prevent further processing and console errors
          return;
        }
        let data = {};
        if (res.headers.get('content-type')?.includes('application/json')) {
          data = await res.json();
        }
        if (res.ok) {
          const updated = [...sectors];
          updated[editIndex] = { ...newSector, _id: sectorId };
          setSectors(updated);
          setSuccess("Sector updated successfully!");
        } else {
          setError(data.message || "Failed to update sector");
        }
      } catch (err) {
        setError("Server error. Please try again.");
      }
      setEditIndex(null);
    } else {
      try {
        const res = await fetch("https://hnv-project.onrender.com/api/sectors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSector),
        });
        if (res.status === 413) {
          alert("Image or data too large. Please upload a smaller image.");
          // Prevent further processing and console errors
          return;
        }
        let data = {};
        if (res.headers.get('content-type')?.includes('application/json')) {
          data = await res.json();
        }
        if (res.ok) {
          setSectors([...sectors, { ...newSector, _id: data.id }]);
          setSuccess("Sector added successfully!");
        } else {
          setError(data.message || "Failed to add sector");
        }
      } catch (err) {
        setError("Server error. Please try again.");
      }
    }
    setNewSector({ title: '', desc: '', img: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewSector(sectors[index]);
  };

  const handleDelete = async (index) => {
    setSuccess("");
    setError("");
    const sectorId = sectors[index]._id;
    try {
      const res = await fetch(`https://hnv-project.onrender.com/api/sectors/${sectorId}`, {
        method: "DELETE"
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        // If response is not JSON, fallback
        data = { message: 'Server error. Please try again.' };
      }
      if (res.ok) {
        const updated = sectors.filter((_, i) => i !== index);
        setSectors(updated);
        setSuccess("Sector deleted successfully!");
      } else {
        setError(data.message || "Failed to delete sector");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
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
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {newSector.img && (
          <img
            src={newSector.img}
            alt="Preview"
            className="w-full h-32 object-cover rounded mt-2 border border-gray-200 dark:border-gray-700"
          />
        )}
      </div>
      {success && (
        <p className="text-green-600 bg-green-100 dark:bg-green-900 p-2 rounded text-center mb-4 text-sm">{success}</p>
      )}
      {error && (
        <p className="text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded text-center mb-4 text-sm">{error}</p>
      )}
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
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 break-words whitespace-pre-line max-h-24 overflow-auto">{sector.desc}</p>
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
