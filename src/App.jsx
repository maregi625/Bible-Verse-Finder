import React, { useState } from "react";
import "./App.css";

function App() {
  const [reference, setReference] = useState("");
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVerse = async () => {
    if (!reference.trim()) {
      setError("Please enter a valid Bible reference.");
      return;
    }

    setLoading(true);
    setError(null);
    setVerse(null);

    try {
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(reference)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the verse. Please check the reference.");
      }
      const data = await response.json();
      setVerse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Bible Verse Finder</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a Bible reference (e.g., John 3:16)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <button onClick={fetchVerse} disabled={loading}>
          {loading ? "Fetching..." : "Get Verse"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {verse && (
        <div className="verse-container">
          <h2>{verse.reference}</h2>
          <p className="verse-text">{verse.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;