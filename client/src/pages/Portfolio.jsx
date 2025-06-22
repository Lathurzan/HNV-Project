import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
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
  {
    title: "Outdoor Patio Construction",
    category: "Outdoor / Patio",
    image: "http://hnvbuilding.co.uk/wp/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-17-at-12.40.33-PM-1-e1714993629193.jpeg",
  },
  {
    title: "Roof Repair & Upgrade",
    category: "Roofing / Maintenance",
    image: "https://storage.googleapis.com/a1aa/image/roof-repair.jpg",
  },
  {
    title: "Bathroom Remodeling",
    category: "Interior / Bathroom",
    image: "https://storage.googleapis.com/a1aa/image/bathroom-remodel.jpg",
  },
  {
    title: "Garden Water Feature",
    category: "Garden / Decoration",
    image: "https://storage.googleapis.com/a1aa/image/water-feature.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
          src="https://storage.googleapis.com/a1aa/image/fbb29ad4-80dd-4b41-4eed-7a597ad03f05.jpg"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item, index) => (
              <motion.div
                key={index}
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
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Nulla vitae elit libero, a pharetra augue. Morbi leo risus,
                    porta ac consectetur ac, vestibulum at eros. <span className="font-semibold cursor-pointer text-yellow-600">[...]</span>
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
        </main>
      </div>
    </motion.div>
  );
};

export default Portfolio;
