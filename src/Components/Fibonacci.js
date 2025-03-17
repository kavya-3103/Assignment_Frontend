import React, { useState } from "react";
import axios from "axios";

const Fibonacci = () => {
  const [count, setCount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFibonacci = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/fibonacci/${count}`);
      setResult(response.data.result);
    } catch (err) {
      console.error("Fibonacci error:", err);
      setError("Failed to calculate Fibonacci sequence.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-form">
      <h2>Fibonacci</h2>
      <input
        type="number"
        placeholder="Enter count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={handleFibonacci}>Calculate Fibonacci</button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result && !loading && !error && (
        <p>
          Result: {Array.isArray(result) ? JSON.stringify(result) : result}
        </p>
      )}
    </div>
  );
};

export default Fibonacci;
