import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import HNV from "../assets/HNV.jpg";

const ServicesPage = () => {
  const serviceList = [
    "Painting and Decorating",
    "Bricklaying & Repointing",
    "Gardening & Landscaping",
    "Bathroom Fitting",
    "Fencing",
    "Plastering & Rendering",
    "Kitchen Fitting",
    "Small work services",
    "Handyman",
  ];

  // Dynamic services state
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://hnv-project.onrender.com/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message || "Error fetching services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const totalPages = Math.ceil(services.length / cardsPerPage);
  const paginatedCards = services.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleDotClick = (index) => setCurrentPage(index);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <>
      <Helmet>
        <title>Our Construction Services | HNV Building</title>
        <meta
          name="description"
          content="Explore renovation, house extensions, and commercial construction services in London."
        />
        <link rel="canonical" href="https://hnvbuilding.co.uk/services" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-gray-800"
      >
      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src={HNV}
          alt="Services hero"
          className="w-full h-[400px] object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="font-extrabold text-4xl md:text-5xl">Our Services</h1>
          <p className="mt-2 text-sm md:text-base font-normal">
            Quality Work, Trusted Results
          </p>
        </div>
      </section>

      {/* Services Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-extrabold leading-tight mb-3">
              Discover a Range of <br />
              Services Tailored to <br />
              Your Needs
            </h2>
            <div className="w-14 h-1 bg-yellow-400 mb-6" />
            <p className="text-gray-600 mb-8 max-w-md">
              Your trusted partner for a wide range of building services. With a
              commitment to quality craftsmanship and a customer-centric approach,
              we bring your visions to life. Explore our diverse services tailored
              to meet your unique needs.
            </p>
            <ul className="space-y-4 max-w-md">
              {serviceList.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-white">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span className="font-semibold text-gray-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="flex justify-end space-x-4 mb-6 self-end">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-yellow-400 transition disabled:opacity-30"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-yellow-400 transition disabled:opacity-30"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Cards */}
            {loading ? (
              <div className="text-center py-10 w-full">Loading services...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-10 w-full">{error}</div>
            ) : services.length === 0 ? (
              <div className="text-center py-10 w-full">No services found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {paginatedCards.map((card, index) => (
                  <div key={card._id || index} className="border border-gray-200 shadow-md">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-3 cursor-pointer rounded-full transition-all duration-300 ${
                    idx === currentPage ? "h-6 bg-yellow-400" : "h-3 bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default ServicesPage;
