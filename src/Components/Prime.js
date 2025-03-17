import React, { useState } from "react";
import axios from "axios";

const Prime = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePrimeCheck = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/prime/${number}`);
      setResult(response.data.result);
    } catch (err) {
      console.error("Prime check error:", err);
      setError("Failed to check if the number is prime.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-form">
      <h2>Prime Check</h2>
      <input
        type="number"
        placeholder="Enter integer greater than 1"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handlePrimeCheck}>Check Prime</button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result !== null && !loading && !error && (
        <p>Result: {result === 1 ? "Prime" : "Not Prime"}</p>
      )}
    </div>
  );
};

export default Prime;
