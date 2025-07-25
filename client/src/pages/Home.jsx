import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import HNV from "../assets/HNV.jpg";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center justify-center gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={star <= rating ? '#facc15' : '#e5e7eb'}
            className={`w-7 h-7 transition-colors duration-200 ${star <= rating ? 'drop-shadow' : ''}`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ReviewPopup = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    position: "",
    rating: 5,
    quote: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          position: form.position,
          rating: form.rating,
          quote: form.quote,
        }),
      });
      if (!res.ok) {
        let data;
        try { data = await res.json(); } catch { data = {}; }
        throw new Error(data.message || "Failed to submit review");
      }
      setLoading(false);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Give Your Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name*"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="position"
            placeholder="Your Position"
            value={form.position}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <div>
            <label className="block text-gray-700 mb-1">Rating</label>
            <StarRating rating={form.rating} setRating={(star) => setForm((prev) => ({ ...prev, rating: star }))} />
          </div>
          <textarea
            name="quote"
            placeholder="Your Review*"
            value={form.quote}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  // Market Sectors state and fetch
  const [sectors, setSectors] = useState([]);
  const [sectorsLoading, setSectorsLoading] = useState(true);
  const [sectorsError, setSectorsError] = useState(null);

  // Story state and fetch
  const [story, setStory] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [storyLoading, setStoryLoading] = useState(true);
  const [storyError, setStoryError] = useState(null);

  useEffect(() => {
    setStoryLoading(true);
    setStoryError(null);
    fetch("/api/story")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch story");
        return res.json();
      })
      .then((data) => {
        setStory(data.story || "");
        setYearOfEstablishment(data.yearOfEstablishment || "our founding year");
        setStoryLoading(false);
      })
      .catch((err) => {
        setStoryError(err.message || "Error loading story");
        setStoryLoading(false);
      });
  }, []);

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
      return (
        <div className="text-center text-gray-300 py-8">
          Loading testimonials...
        </div>
      );
    }
    if (error) {
      return <div className="text-center text-red-400 py-8">{error}</div>;
    }
    if (!testimonials.length) {
      return (
        <div className="text-center text-gray-400 py-8">
          No testimonials found.
        </div>
      );
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

  const [showReview, setShowReview] = useState(false);

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
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center px-6 md:px-20 py-10 -mt-30 z-10 relative">
        {[
          {
            icon: "fas fa-clock",
            title: "Punctual Delivery Time",
            description: "99% Delivered On Time",
            bg: "bg-[#dcb25a]",
            textColor: "text-gray-900",
          },
          {
            icon: "fas fa-industry",
            title: "High Technology Factory",
            description: "& Environment Friendly",
            bg: "bg-gray-900",
            textColor: "text-white",
          },
          {
            icon: "fas fa-users-cog",
            title: "High Standard Labors",
            description: "99% QC Passed",
            bg: "bg-[#c99f44]",
            textColor: "text-gray-900",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`${item.bg} ${item.textColor} p-8 flex flex-col items-center justify-center  shadow-lg`}
          >
            <i className={`${item.icon} fa-2x mb-4 text-black`}></i>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
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
            {storyLoading ? (
              "Loading story..."
            ) : storyError ? (
              <span className="text-red-500">{storyError}</span>
            ) : story ? (
              story.replace("[Year of Establishment]", yearOfEstablishment || "our founding year")
            ) : (
              "No story available."
            )}
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
          {/* Button to Submit Review */}
          <div className="mt-10 flex justify-center">
            <button
              className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
              onClick={() => setShowReview(true)}
            >
              Give Your Review
            </button>
          </div>
          <ReviewPopup
            open={showReview}
            onClose={() => setShowReview(false)}
            onSuccess={() => {}}
          />
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
               <p className="text-xs text-blue-900 leading-tight text-center bg-blue-100 bg-opacity-60 rounded-lg px-3 py-2 mt-1 break-all whitespace-normal">
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
