import React, { useEffect, useState } from "react";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  // Fetch all messages
  const fetchMessages = () => {
    setLoading(true);
    fetch("/api/messages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        // Defensive: ensure createdAt is always present and valid
        setMessages(
          Array.isArray(data)
            ? data.map((msg) => ({
                ...msg,
                createdAt: msg.createdAt || msg.updatedAt || null,
              }))
            : []
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error loading messages");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete message");
      fetchMessages(); // Refetch after delete
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : messages.length === 0 ? (
        <div>No messages found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Message</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id}>
                  <td className="py-2 px-4 border">{msg.fullName}</td>
                  <td className="py-2 px-4 border">{msg.email}</td>
                  <td className="py-2 px-4 border">{msg.subject}</td>
                  <td className="py-2 px-4 border">{msg.message}</td>
                  <td className="py-2 px-4 border">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={deleting === msg._id}
                    >
                      {deleting === msg._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
