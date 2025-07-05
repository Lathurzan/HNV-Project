import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import HNV from "../assets/HNV.jpg";


const Home = () => {
  // Market Sectors state and fetch
  const [sectors, setSectors] = useState([]);
  const [sectorsLoading, setSectorsLoading] = useState(true);
  const [sectorsError, setSectorsError] = useState(null);

  useEffect(() => {
    setSectorsLoading(true);
    setSectorsError(null);
    fetch("/api/sectors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sectors");
        return res.json();
      })
      .then((data) => {
        setSectors(data);
        setSectorsLoading(false);
      })
      .catch((err) => {
        setSectorsError(err.message || "Error loading sectors");
        setSectorsLoading(false);
      });
  }, []);

  // TestimonialsSection: fetches and displays the last testimonial from backend
  const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      setError(null);
      fetch("/api/testimonials/recent")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch testimonials");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data); // Store all 3 testimonials
          } else {
            setTestimonials([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Error loading testimonials");
          setLoading(false);
        });
    }, []);

    if (loading) {
      return <div className="text-center text-gray-300 py-8">Loading testimonials...</div>;
    }
    if (error) {
      return <div className="text-center text-red-400 py-8">{error}</div>;
    }
    if (!testimonials.length) {
      return <div className="text-center text-gray-400 py-8">No testimonials found.</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((testimonial, idx) => (
          <div
            key={testimonial._id || idx}
            className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:bg-white/30 transition-all duration-300 flex flex-col items-center"
          >
            <FaQuoteLeft className="text-yellow-300 text-2xl mb-4" />
            <p className="text-white text-base leading-relaxed mb-6 text-center">
              {testimonial.quote}
            </p>
            <div className="flex flex-col items-center mt-auto">
              <h4 className="text-yellow-300 font-semibold text-lg">
                {testimonial.name}
              </h4>
              <p className="text-white/90 text-sm">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
     <motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <HeroSection />
</motion.div>

      {/* Features Section */}
      <section className="flex flex-wrap w-full justify-center gap-y-6 gap-x-0 md:gap-x-6 my-10">
        { [
          {
            icon: "fas fa-clock",
            title: "Punctual Delivery Time",
            description: "99% Delivered On Time",
            bg: "bg-yellow-100",
            textColor: "text-gray-900",
          },
          {
            icon: "fas fa-industry",
            title: "High Technology Factory",
            description: "& Environment Friendly",
            bg: "bg-blue-100",
            textColor: "text-gray-900",
          },
          {
            icon: "fas fa-users-cog",
            title: "High Standard Labors",
            description: "99% QC Passed",
            bg: "bg-green-100",
            textColor: "text-gray-900",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`w-full sm:w-1/2 md:w-1/3 ${item.bg} ${item.textColor} p-8 flex flex-col items-center text-center rounded-2xl shadow-md border border-gray-100`}
          >
            <i className={`${item.icon} fa-2x mb-4 text-yellow-500`}></i>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm leading-tight max-w-[220px]">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-20 px-4 sm:px-8 md:px-16 lg:px-32"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-16">
          <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h2 className="text-gray-700 text-2xl font-bold border-b-4 border-yellow-500 pb-2 mb-2 text-center md:text-left">
              Real Hnv Story
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-col space-y-8">
            <div className="flex justify-center md:justify-start space-x-8 text-gray-600 text-2xl">
              <i className="fas fa-building" />
              <i className="fas fa-broadcast-tower" />
              <i className="fas fa-battery-full" />
            </div>
            <p className="text-base leading-relaxed max-w-2xl text-gray-700 mx-auto md:mx-0 text-center md:text-left">
              HNV Building started back in [Year of Establishment] with just a
              bunch of passionate people who loved building things. Since then,
              we've grown into a strong team that's all about bringing fresh
              ideas, solid quality, and trust to every project we do.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="./About"
                className="bg-yellow-500 text-white text-sm font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition inline-block text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <img
          src="https://storage.googleapis.com/a1aa/image/165a34b7-23b0-4c6d-5130-82be8574f2f7.jpg"
          alt="Light gray factory illustration"
          className="pointer-events-none select-none absolute top-0 right-0 bottom-0 opacity-10 max-w-[400px] hidden md:block"
          width={400}
          height={300}
        />
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 py-24"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://storage.googleapis.com/a1aa/image/2fd89a5e-537c-4dbb-eeff-7a4a829f9a36.jpg"
            alt="Testimonial background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-700/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-yellow-300 text-3xl font-bold mb-2">
              What Our Clients Say
            </h2>
            <div className="w-24 border-b-4 border-yellow-300 mx-auto" />
          </div>

          {/* Fetch and show the last testimonial from backend */}
          <TestimonialsSection />
        </div>
      </motion.section>

      {/* Market Sectors Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-16"
      >
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-gray-700 text-2xl font-bold pb-2 mb-2 text-center">
            Market Sectors
          </h2>
          <div className="w-24 h-1 bg-yellow-500 rounded-full" />
        </div>

        {sectorsLoading ? (
          <div className="text-center text-gray-500 py-8">Loading sectors...</div>
        ) : sectorsError ? (
          <div className="text-center text-red-500 py-8">{sectorsError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector._id || index}
                whileHover={{ scale: 1.04 }}
                className="group hover:shadow-xl transition-all rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-200 p-5 border border-blue-200 flex flex-col items-center shadow-lg"
                style={{ boxShadow: '0 4px 24px 0 rgba(59, 130, 246, 0.10)' }}
              >
                <img
                  src={sector.img}
                  alt={sector.title}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x250?text=No+Image'; }}
                  className="w-full h-40 object-cover rounded-xl mb-4 border border-blue-100 transition-transform duration-300 group-hover:scale-105"
                />
                <h4 className="text-base font-semibold text-blue-800 mb-1 text-center drop-shadow-sm">
                  {sector.title}
                </h4>
                <p className="text-xs text-blue-900 leading-tight text-center bg-blue-100 bg-opacity-60 rounded-lg px-3 py-2 mt-1">
                  {sector.desc}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;
