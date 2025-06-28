import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HNV from "../assets/HNV.jpg";
import axios from "axios";

const AboutUs2 = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAboutPage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/about");
        setAbout(response.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!about) {
    return <div className="text-center py-10 text-red-600">Failed to load content.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-700"
    >
      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src={HNV}
          alt="Modern industrial building"
          className="w-full h-[400px] object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="font-extrabold text-4xl md:text-5xl uppercase tracking-wide">About Us</h1>
          <p className="mt-2 text-sm md:text-base font-light max-w-xl">
            Building with Purpose. Powered by Trust.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-wrap w-full">
        {about.features.map((item, index) => (
          <div
            key={index}
            className={`w-1/2 md:w-1/4 ${index % 2 === 0 ? "bg-black text-white" : "bg-[#dcb25a] text-black"} p-8 flex flex-col items-center text-center`}
          >
            <i className={`fas fa-star fa-lg mb-4`}></i>
            <h3 className="font-bold text-sm mb-2">{item.title}</h3>
            <p className="text-xs leading-tight max-w-[220px]">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="flex flex-col md:flex-row font-[Inter,sans-serif] shadow-md mx-4 md:mx-10 lg:mx-16 xl:mx-24 my-12">
        {/* Left */}
        <div className="bg-gray-100 flex flex-col justify-center px-8 py-16 md:w-1/2">
          <h2 className="text-gray-900 font-semibold text-xl mb-6 max-w-md leading-tight">
            Building Dreams, Creating Spaces:<br />
            Your Trusted Construction Partner
          </h2>
          <p className="text-gray-600 text-sm mb-6 max-w-md leading-relaxed">
            {about.story}
          </p>
          <button
            type="button"
            className="text-xs font-bold text-yellow-600 border border-yellow-600 px-5 py-2 w-max hover:bg-yellow-600 hover:text-white transition-colors"
          >
            Get A Quote
          </button>
        </div>

        {/* Right */}
        <div className="relative md:w-1/2">
          <img
            src="https://storage.googleapis.com/a1aa/image/a99521d2-e88d-401b-aa55-16a482176c7f.jpg"
            alt="Industrial factory"
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-10 py-16 space-y-10 text-white max-w-lg">
            {about.features.map((item, index) => (
              <div className="flex space-x-6" key={index}>
                <i className="fas fa-check text-yellow-500 text-3xl flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col md:flex-row mt-24 px-10 md:px-20 lg:px-28 xl:px-32 max-w-7xl mx-auto mb-16">
        <div className="md:w-1/3">
          <h3 className="font-semibold text-gray-900 text-lg md:text-xl leading-tight max-w-xs border-b-2 border-[#c9973f] pb-1">
            Our Mission
          </h3>
        </div>
        <div className="md:w-2/3 mt-6 md:mt-0 text-sm md:text-base leading-relaxed text-gray-600 max-w-4xl">
          {about.mission}
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs2;
