import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import HNV from "../assets/HNV.jpg"

const ICON_MAP = {
  "Reliable Teamwork": "fas fa-hard-hat",
  "Quality Tools & Methods": "fas fa-tools",
  "Eco-Friendly Focus": "fas fa-leaf",
  "Safety First": "fas fa-shield-alt",
};

const DEFAULT_FEATURES = [
  {
    icon: "fas fa-hard-hat",
    title: "Reliable Teamwork",
    description: "Our skilled professionals work together seamlessly to bring your vision to life.",
    bg: "bg-black",
    textColor: "text-white",
  },
  {
    icon: "fas fa-tools",
    title: "Quality Tools & Methods",
    description: "We use high-grade tools and proven techniques to ensure durable, lasting builds.",
    bg: "bg-gray-900",
    textColor: "text-white",
  },
  {
    icon: "fas fa-leaf",
    title: "Eco-Friendly Focus",
    description: "Committed to green building solutions that are safe for both people and the planet.",
    bg: "bg-[#dcb25a]",
    textColor: "text-black",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Safety First",
    description: "Safety is at the heart of everything we do — for our team, clients, and projects.",
    bg: "bg-[#c99f44]",
    textColor: "text-black",
  },
];

const AboutUs2 = () => {
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [story, setStory] = useState("");
  const [mission, setMission] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("https://hnv-project.onrender.com/api/about");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            if (Array.isArray(data.features) && data.features.length > 0) {
              const mapped = data.features.slice(0, 4).map((f, i) => ({
                icon: ICON_MAP[f.title] || DEFAULT_FEATURES[i]?.icon || "fas fa-star",
                title: f.title,
                description: f.description,
                bg: DEFAULT_FEATURES[i]?.bg || "bg-gray-200",
                textColor: DEFAULT_FEATURES[i]?.textColor || "text-black",
              }));
              setFeatures(mapped);
            }
            setStory(data.story || "");
            setMission(data.mission || "");
          }
        }
      } catch (err) {
        // fallback to default
      }
    };
    fetchAbout();
  }, []);

  return (
    <>
      <Helmet>
        <title>About HNV Renovation & Construction Preston | Trusted Builders</title>
        <meta
          name="description"
          content="HNV Building is a trusted construction and renovation company in Preston. Learn about our history, values, and commitment to quality home extensions and renovations."
        />
        <link rel="canonical" href="https://hnv-project-frontend.onrender.com/about" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">About HNV Building in Preston</h1>
        <p className="text-gray-700 text-lg mb-4">
          HNV Building provides professional home renovation, house extensions, and commercial construction services in Preston. We pride ourselves on delivering quality workmanship and exceptional customer service.
        </p>
        <p className="text-gray-700 text-lg">
          Whether you need a full home renovation, an extension, or commercial building services, HNV Building in Preston is your trusted partner.
        </p>
      </div>
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
            src={HNV} // Changed to use the imported image
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

        {/* Icon Grid */}
        <section className="flex flex-wrap w-full">
          {features.map((item, index) => (
            <div
              key={index}
              className={`w-1/2 md:w-1/4 ${item.bg} ${item.textColor} p-8 flex flex-col items-center text-center`}
            >
              <i className={`${item.icon} fa-lg mb-4`}></i>
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-xs leading-tight max-w-[220px]">{item.description}</p>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className="flex flex-col md:flex-row font-[Inter,sans-serif] shadow-md mx-4 md:mx-10 lg:mx-16 xl:mx-24 my-12">
          {/* Left Side */}
          <div className="bg-gray-100 flex flex-col justify-center px-8 py-16 md:w-1/2">
            <h2 className="text-gray-900 font-semibold text-xl mb-6 max-w-md leading-tight">
              Building Dreams, Creating Spaces:<br />
              Your Trusted Construction Partner
            </h2>
            <p className="text-gray-600 text-sm mb-6 max-w-md leading-relaxed">
              {story || "At HNV Building, we combine passion, precision, and professionalism to bring your vision to life. Whether it's a cozy home or a large-scale commercial project, our mission is to build spaces that reflect quality, functionality, and enduring value."}
            </p>
            <Link
              to="/contact"
              className="text-xs font-bold text-yellow-600 border border-yellow-600 px-5 py-2 w-max hover:bg-yellow-600 hover:text-white transition-colors"
            >
              Get A Quote
            </Link>
          </div>

          {/* Right Side */}
          <div className="relative md:w-1/2">
            <img
              src="https://storage.googleapis.com/a1aa/image/a99521d2-e88d-401b-aa55-16a482176c7f.jpg"
              alt="Industrial factory"
              className="w-full h-full object-cover brightness-[0.3]"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-10 py-16 space-y-10 text-white max-w-lg">
              {features.map((item, index) => (
                <div className="flex space-x-6" key={index}>
                  <i className={`${item.icon} text-yellow-500 text-3xl flex-shrink-0`} />
                  <div>
                    <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                    <p className="text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="flex flex-col md:flex-row mt-24 px-10 md:px-20 lg:px-28 xl:px-32 max-w-7xl mx-auto">
          <div className="md:w-1/3">
            <h3 className="font-semibold text-gray-900 text-lg md:text-xl leading-tight max-w-xs border-b-2 border-[#c9973f] pb-1">
              Our Mission
            </h3>
          </div>
          <div className="md:w-2/3 mt-6 md:mt-0 text-sm md:text-base leading-relaxed text-gray-600 max-w-4xl">
            {mission || "At HNV Building, our mission is to shape environments that inspire, endure, and elevate lives. We are committed to delivering exceptional construction solutions through craftsmanship, innovation, and a deep understanding of our clients’ needs. Every project is more than just bricks and mortar — it’s a promise to build lasting value, create meaningful spaces, and foster relationships rooted in trust, transparency, and excellence. Whether residential or commercial, we aim to set the benchmark for quality and customer satisfaction in every structure we bring to life."}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default AboutUs2;
