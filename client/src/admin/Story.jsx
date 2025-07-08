import React, { useState, useEffect } from "react";
import axios from "axios";

const StoryForm = () => {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing story (on component mount)
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get("/api/story");
        setStory(res.data.story);
      } catch (err) {
        console.error("Failed to load story", err);
      }
    };
    fetchStory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/story", { story });
      alert("Story updated successfully!");
    } catch (err) {
      alert("Error updating story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-3xl mx-auto">
      <label className="block font-semibold text-lg text-gray-700">
        HNV Story
      </label>
      <textarea
        rows={6}
        className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Enter the HNV story..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Story"}
      </button>
    </form>
  );
};

export default StoryForm;