import React, { useState } from "react";
import axios from "axios";

const Factorial = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFactorial = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/factorial/${number}`);
      setResult(response.data.result);
    } catch (err) {
      console.error("Factorial error:", err);
      setError("Failed to calculate factorial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-form">
      <h2>Factorial</h2>
      <input
        type="number"
        placeholder="Enter a non-negative integer"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleFactorial}>Calculate Factorial</button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result !== null && !loading && !error && <p>Result: {result}</p>}
    </div>
  );
};

export default Factorial;
