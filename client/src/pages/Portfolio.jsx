import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HNV from '../assets/HNV.jpg'; // Importing the image for the hero section

const ITEMS_PER_PAGE = 6;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error loading projects');
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentItems = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 text-gray-700 min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src={HNV} // Using the imported image for the hero section
          alt="Hero"
          className="w-full h-[300px] md:h-[400px] object-cover brightness-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="font-extrabold text-4xl md:text-5xl drop-shadow-lg">Portfolio</h1>
          <p className="mt-2 text-base md:text-lg font-normal drop-shadow">
            Justo Vulputate Vehicula
          </p>
        </div>
      </section>

      <div className="bg-gray-50 text-black font-sans">
        <main className="max-w-7xl mx-auto py-12 px-4">
          <h2 className="text-center text-2xl font-bold mb-10 text-gray-800">Our Projects</h2>
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading projects...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">{item.title}</h3>
                      <p className="text-xs italic text-yellow-600 mb-3">{item.category}</p>
                      <p className="text-sm text-gray-700 flex-1">
                        {/* You can add a description field in the future */}
                        <span className="font-semibold cursor-pointer text-yellow-600">[...]</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <nav className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-full border text-base flex items-center justify-center transition ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-gray-400 text-gray-900 hover:bg-yellow-100'
                  }`}
                  aria-label="Previous page"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-9 h-9 rounded-full border text-base flex items-center justify-center transition ${
                      currentPage === i + 1
                        ? 'bg-yellow-500 text-white border-yellow-500'
                        : 'bg-white border-gray-400 text-gray-900 hover:bg-yellow-100'
                    }`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 rounded-full border text-base flex items-center justify-center transition ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-gray-400 text-gray-900 hover:bg-yellow-100'
                  }`}
                  aria-label="Next page"
                >
                  &gt;
                </button>
              </nav>
            </>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default Portfolio;
