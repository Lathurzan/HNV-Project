import React, { useState } from "react";

const Aboutpage = () => {
  const [mission, setMission] = useState(
    "At HNV Building, our mission is to shape environments that inspire, endure, and elevate lives..."
  );

  const [story, setStory] = useState(
    "At HNV Building, we combine passion, precision, and professionalism to bring your vision to life..."
  );

  const [features, setFeatures] = useState([
    {
      title: "Expert Craftsmanship",
      description:
        "HNV Building blends passion and expertise for top-notch domestic and commercial projects.",
    },
    {
      title: "Innovative Solutions",
      description:
        "We go beyond construction, bringing dreams to life by enhancing both residential and commercial environments.",
    },
    {
      title: "Built to Last",
      description:
        "Our commitment is clear – delivering construction excellence that stands out and stands strong.",
    },
  ]);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const handleUpdate = () => {
    alert("Content updated successfully!");
    // Future: send updated content to backend (e.g., via fetch or axios)
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        About Us Page 
      </h2>

      {/* Mission Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Mission Statement
        </h3>
        <textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Story Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Story Section
        </h3>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Features Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Feature Highlights
        </h3>
        {features.map((feature, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded-md bg-gray-50 dark:bg-gray-800"
          >
            <input
              type="text"
              value={feature.title}
              onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
              placeholder="Feature Title"
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              value={feature.description}
              onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
              rows={3}
              placeholder="Feature Description"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-md transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Aboutpage;
