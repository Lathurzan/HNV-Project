import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import HNV from "../assets/HNV.jpg"
import TestimonialsSection from "../components/TestimonialSlider";

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
            <div className="flex items-center mt-auto">
              <img
                src={testimonial.image || "https://via.placeholder.com/56x56?text=No+Image"}
                alt={testimonial.name}
                onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/56x56?text=No+Image"; }}
                className="w-14 h-14 rounded-full border-2 border-yellow-300"
              />
              <div className="ml-4">
                <h4 className="text-yellow-300 font-semibold text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-white/90 text-sm">{testimonial.position}</p>
              </div>
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
        style={{ backgroundImage: `url(${HNV})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
  

      </motion.div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 -mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Punctual Delivery Time",
            subtitle: "99% Delivered On Time",
            image:
              "https://storage.googleapis.com/a1aa/image/2168022c-51ac-4f4c-dabb-e49db37fa762.jpg",
            overlay: "bg-yellow-400 bg-opacity-90",
            titleColor: "text-gray-800",
            textColor: "text-gray-900",
          },
          {
            title: "High Technology Factory",
            subtitle: "& Environment Friendly",
            image:
              "https://storage.googleapis.com/a1aa/image/10b75729-54f2-4f4d-6182-e96191f1ff5a.jpg",
            overlay: "bg-black bg-opacity-70",
            titleColor: "text-yellow-400",
            textColor: "text-white",
          },
          {
            title: "High Standard Labors",
            subtitle: "99% QC Passed",
            image:
              "https://storage.googleapis.com/a1aa/image/ce7931b5-7079-4372-3877-95d713d7b5cf.jpg",
            overlay: "bg-black bg-opacity-70",
            titleColor: "text-yellow-400",
            textColor: "text-white",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-56 object-cover"
              width={600}
              height={300}
            />
            <div
              className={`${feature.overlay} absolute inset-0 flex flex-col justify-center items-center text-center px-6 py-10 group-hover:bg-opacity-95 transition rounded-2xl`}
            >
              <h3 className={`${feature.titleColor} text-2xl font-bold mb-2 drop-shadow`}>
                {feature.title}
              </h3>
              <p className={`${feature.textColor} text-base font-medium`}>{feature.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

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
              <button className="bg-yellow-500 text-white text-sm font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                Learn More
              </button>
              <button className="border border-yellow-500 text-yellow-600 text-sm font-semibold px-6 py-2 rounded-lg hover:bg-yellow-50 transition">
                Get A Quote
              </button>
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
                className="group hover:shadow-2xl transition-all rounded-2xl overflow-hidden bg-white p-5 border border-gray-100 flex flex-col items-center"
              >
                <img
                  src={sector.img}
                  alt={sector.title}
                  className="w-full h-40 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {sector.title}
                </h4>
                <p className="text-sm text-gray-600 leading-tight text-center">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;
