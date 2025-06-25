import React, { useState, useEffect } from "react";

const Aboutpage = () => {
  const [mission, setMission] = useState("");
  const [story, setStory] = useState("");
  const [features, setFeatures] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [buttonState, setButtonState] = useState("default");

  useEffect(() => {
    const fetchAbout = async () => {
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/about");
        if (!res.ok) throw new Error("Failed to fetch about page data");
        const data = await res.json();
        setMission(data.mission || "");
        setStory(data.story || "");
        setFeatures(Array.isArray(data.features) ? data.features : []);
      } catch (err) {
        setError("Could not load about page data.");
      }
    };
    fetchAbout();
  }, []);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const handleUpdate = async () => {
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mission, story, features }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("✅ Content updated successfully!");
        setButtonState("saved");
        setTimeout(() => setButtonState("default"), 5000);
      } else {
        setError(data.message || "Failed to update content");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-4 sm:p-8 md:p-12 bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 mt-10 mb-16">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        📝 About Us Editor
      </h2>

      {/* Feedback Messages */}
      {success && (
        <p className="text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-300 border-l-4 border-green-500 px-4 py-3 mb-4 rounded shadow-sm animate-pulse">
          {success}
        </p>
      )}
      {error && (
        <p className="text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-300 border-l-4 border-red-500 px-4 py-3 mb-4 rounded shadow-sm">
          {error}
        </p>
      )}

      {/* Mission Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          🎯 Mission Statement
        </h3>
        <textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          rows={6}
          placeholder="Enter your mission here..."
          className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-yellow-400"
        />
      </section>

      {/* Story Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          📖 Our Story
        </h3>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={6}
          placeholder="Share your brand story..."
          className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-yellow-400"
        />
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          💡 Feature Highlights
        </h3>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg shadow"
            >
              <input
                type="text"
                value={feature.title}
                onChange={(e) =>
                  handleFeatureChange(index, "title", e.target.value)
                }
                placeholder="Feature Title"
                className="w-full mb-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                value={feature.description}
                onChange={(e) =>
                  handleFeatureChange(index, "description", e.target.value)
                }
                rows={3}
                placeholder="Feature Description"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Update Button */}
      <div className="text-center">
        <button
          onClick={handleUpdate}
          className={`inline-block px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
            buttonState === "saved"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-yellow-600 hover:bg-yellow-700"
          } shadow-md`}
        >
          {buttonState === "saved" ? "✅ Saved" : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Aboutpage;
