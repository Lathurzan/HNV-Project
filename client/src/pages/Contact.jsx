import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contact form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) throw new Error('Failed to fetch settings');
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err.message || 'Error fetching settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setFormLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        let data;
        try { data = await res.json(); } catch { data = {}; }
        throw new Error(data.error || "Failed to send message");
      }
      setFormSuccess("Message sent successfully!");
      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 font-sans text-base text-gray-700 min-h-screen">
      {/* Header */}
      <header className="relative w-full h-72 bg-black/80 overflow-hidden">
        <img
          src="https://storage.googleapis.com/a1aa/image/714a552b-4181-4d5b-45dc-9cafc569e49a.jpg"
          alt="Construction background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold text-4xl md:text-5xl tracking-wide"
          >
            CONTACT US
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="italic mt-2 text-base sm:text-lg"
          >
            Get in Touch
          </motion.p>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-5xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
        >
          <h3 className="font-bold text-lg mb-3 text-gray-800 text-center border-b-2 border-yellow-400 pb-2">
            Leave us your info
          </h3>
          <p className="mb-8 text-sm text-gray-500 text-center">
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 text-base px-5 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 text-base px-5 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject*"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 text-base px-5 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              rows={4}
              name="message"
              placeholder="Message*"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 text-base px-5 py-3 rounded resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {formError && <div className="text-red-500 text-sm">{formError}</div>}
            {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white text-base font-bold uppercase px-5 py-3 rounded shadow hover:bg-yellow-600 transition-colors"
              disabled={formLoading}
            >
              {formLoading ? "Submitting..." : "Submit Now"}
            </button>
          </form>
        </motion.section>

        {/* Map & Contact Info */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col w-full max-w-md gap-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold mb-3 text-lg text-gray-800 border-b-2 border-yellow-400 pb-2">
              Our Location
            </h3>
            <div className="w-full h-44 rounded overflow-hidden border border-gray-200 mb-4">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.666893381352!2d-2.713049684161799!3d53.78402405104044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b6d7e0b2e7e7b%3A0x7b7e7e7e7e7e7e7e!2s30%20Ingle%20Head%2C%20Fulwood%2C%20Preston%20PR2%203NS%2C%20UK!5e0!3m2!1sen!2suk!4v1717171717171!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            {loading ? (
              <div className="text-gray-400 text-sm mb-4">Loading address...</div>
            ) : error ? (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            ) : (
              <address className="not-italic text-base leading-relaxed text-gray-700 mb-4">
                {settings?.address?.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}<br />
                  </React.Fragment>
                ))}
              </address>
            )}
            <div className="space-y-3 text-base text-gray-700">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-yellow-500" />
                {loading ? (
                  <span className="text-gray-400">Loading...</span>
                ) : error ? (
                  <span className="text-red-500">-</span>
                ) : (
                  <a href={`mailto:${settings?.email || ''}`} className="hover:underline">
                    {settings?.email || '-'}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-yellow-500" />
                {loading ? (
                  <span className="text-gray-400">Loading...</span>
                ) : error ? (
                  <span className="text-red-500">-</span>
                ) : (
                  <span>{settings?.phone || '-'}</span>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ContactUs;

