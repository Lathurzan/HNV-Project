import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HNV from '../assets/HNV.jpg';

const ITEMS_PER_PAGE = 6;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/projects') // Update this if needed
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
          src={HNV}
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

      {/* Project Sections */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-center text-2xl font-bold mb-10 text-gray-800">Our Projects</h2>

        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <>
            <div className="flex flex-col gap-y-20">
              {currentItems.map((item, index) => (
                <motion.section
                  key={item._id || index}
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col md:flex-row gap-10 items-center"
                >
                  {/* Text Block */}
                  <div
                    className={`w-full md:w-[30%] py-6 px-6 md:px-10 ${
                      index % 2 === 1 ? 'md:order-2' : ''
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-sm italic text-gray-500 mb-4">{item.category}</p>
                    <p className="text-base text-gray-700 whitespace-pre-line break-words max-w-prose">
                      {item.description || ''}
                    </p>
                  </div>

                  {/* Image Block */}
                  <div
                    className={`w-full md:w-[70%] h-[280px] md:h-[380px] overflow-hidden rounded ${
                      index % 2 === 1 ? 'md:order-1' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </motion.section>
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
                  aria-current={currentPage === i + 1 ? 'page' : undefined}
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
    </motion.div>
  );
};

export default Portfolio;
