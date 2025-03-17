import React, { useState } from "react";
import axios from "axios";

const Addition = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddition = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/addition", {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
      });
      setResult(response.data.result);
    } catch (err) {
      console.error("Addition error:", err);
      setError("Failed to calculate addition.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-form">
      <h2>Addition</h2>
      <input
        type="number"
        placeholder="Enter Number 1" 
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={handleAddition}>Add</button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result !== null && !loading && !error && <p>Result: {result}</p>}
    </div>
  );
};

export default Addition;
